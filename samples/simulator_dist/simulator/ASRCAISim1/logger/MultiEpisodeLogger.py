# Copyright (c) 2021-2025 Air Systems Research Center, Acquisition, Technology & Logistics Agency(ATLA)
import os
import time
import numpy as np
import datetime
from ASRCAISim1.core import (
	Callback,
	getValueFromJsonKRD,
	Fighter,
	serialize_attr_with_type_info,
	isInputArchive,
)
class MultiEpisodeLogger(Callback):
	"""エピソード間に跨るログファイルを生成する例(シングルスレッド版)

	並列実行するとそのインスタンスごとにログファイルが作られる。
	"""
	def initialize(self):
		super().initialize()
		self.prefix=getValueFromJsonKRD(self.modelConfig,"prefix",self.randomGen,"")
		self.episodeInterval=getValueFromJsonKRD(self.modelConfig,"episodeInterval",self.randomGen,1)
		self.ratingDenominator=getValueFromJsonKRD(self.modelConfig,"ratingDenominator",self.randomGen,100)
		self.verbose=getValueFromJsonKRD(self.modelConfig,"verbose",self.randomGen,1)
		self.episodeCounter=0
		self.totalSteps=0
		self.winCount=0
		self.recentWinLoses=[]
		self.isFileCreated=False
		self.file=None
		self.fileAbsPath=""
		self.startT=None
		self.westSider=""
		self.eastSider=""
	def serializeInternalState(self, archive, full: bool):
		super().serializeInternalState(archive, full)
		if full:
			serialize_attr_with_type_info(archive, self
				,"prefix"
				,"episodeInterval"
				,"ratingDenominator"
				,"verbose"
				,"startT"
				,"westSider"
				,"eastSider"
			)
		serialize_attr_with_type_info(archive, self
			,"episodeCounter"
			,"totalSteps"
			,"winCount"
			,"recentWinLoses"
			,"isFileCreated"
		)
		if self.isFileCreated:
			serialize_attr_with_type_info(archive, self, "fileAbsPath")
			if isInputArchive(archive):
				self.file=open(self.fileAbsPath,'a')
		else:
			if isInputArchive(archive):
				self.fileAbsPath=""
				self.file=None
	def onEpisodeBegin(self):
		self.startT=time.time()
		ruler=self.manager.getRuler()()
		self.westSider=ruler.westSider
		self.eastSider=ruler.eastSider
	def onEpisodeEnd(self):
		ruler=self.manager.getRuler()()
		self.episodeCounter+=1
		endT=time.time()
		info={
			"winLose":(ruler.winner==self.eastSider),
			"finishedTime":self.manager.getElapsedTime(),
			"numSteps":self.manager.getExposedStepCount(),
			"calcTime":endT-self.startT,
			"scores":ruler.score,
			"totalRewards":{agent.getName():self.manager.totalRewards[agent.getFullName()] for agent in [a() for a in self.manager.getAgents()]},
			"numAlives":{team:np.sum([f.isAlive()
				for f in [f() for f in self.manager.getAssets(lambda a:isinstance(a,Fighter) and a.getTeam()==team)]
			]) for team in ruler.score},
			"endReason":ruler.endReason.name
		}
		if(self.file is None):
			self.fileAbsPath=os.path.abspath(
				self.prefix+"_"+datetime.datetime.now().strftime("%Y%m%d%H%M%S")+".csv"
			)
			os.makedirs(os.path.dirname(self.fileAbsPath),exist_ok=True)
			self.file=open(self.fileAbsPath,'w')
			self.isFileCreated=True
			self.makeHeader(info)
		self.totalSteps+=info["numSteps"]
		if(info["winLose"]):
			self.winCount+=1
		if(self.episodeCounter<=self.ratingDenominator):
			self.recentWinLoses.append(1.0 if info["winLose"] else 0.0)
		else:
			self.recentWinLoses[(self.episodeCounter-1)%self.ratingDenominator]=1.0 if info["winLose"] else 0.0
		if(self.episodeCounter%self.episodeInterval==0):
			self.makeFrame(info)
		if(self.verbose==1):
			print("Episodes=(",self.winCount,"/",self.episodeCounter,"), recent winning rate=",100.0*sum(self.recentWinLoses)/len(self.recentWinLoses),", endReason=",info["endReason"],"finished at t=",info["finishedTime"],",","with  score=", info["scores"]," and totalRewards=",info["totalRewards"]," in ",info["calcTime"]," seconds.")
	def makeHeader(self,info):
		row=["Episode"]
		scores=info["scores"]
		row.extend(["score["+team+"]" for team in scores.keys()])
		totalRewards=info["totalRewards"]
		row.extend(["totalReward["+agent+"]" for agent in totalRewards.keys()])
		row.extend(["finishedTime[s]","numSteps","calcTime[s]","BlueWin","WinCount","WinRate[%]"])
		numAlives=info["numAlives"]
		row.extend(["numAlives["+team+"]" for team in numAlives.keys()])
		row.extend(["endReason"])
		self.file.write(','.join(row)+"\n")
		self.file.flush()
	def makeFrame(self,info):
		row=[str(self.episodeCounter)]
		scores=info["scores"]
		row.extend([format(s,'+0.16e') for s in scores.values()])
		totalRewards=info["totalRewards"]
		def getScalarTotalRewards(v):
			#sum up structured reward elements into a scalar
			if isinstance(v,float):
				return v
			else:
				return sum(v.values())
		row.extend([format(getScalarTotalRewards(t),'+0.16e') for t in totalRewards.values()])
		row.extend([
			format(info["finishedTime"],'+0.16e'),
			str(info["numSteps"]),
			format(info["calcTime"],'+0.16e'),
			"1" if info["winLose"] else "0"])
		row.append(str(self.winCount))
		row.append(format(100.0*sum(self.recentWinLoses)/len(self.recentWinLoses),'+0.16e'))
		numAlives=info["numAlives"]
		row.extend([format(s,'+0.16e') for s in numAlives.values()])
		row.extend([info["endReason"]])
		self.file.write(','.join(row)+"\n")
		self.file.flush()
