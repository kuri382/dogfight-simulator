# Copyright (c) 2021-2025 Air Systems Research Center, Acquisition, Technology & Logistics Agency(ATLA)
#----------------------------------------------------------------
# ASRCAISim1プラグイン用の__init__.pyのテンプレート
# __init__.py template for ASRCAISim1's plugin
#----------------------------------------------------------------

##############################################
# ASRCAISim1プラグインの共通初期化処理
#     (1) 依存するプラグインをインポート(し、通常のインポートと同様に自身のattributeに追加)
#     (2) C++モジュールがあればインポートしてそのattributeを自身のattributeに追加
#     (3) FactoryHelperインスタンスを'factoryHelper'としてattributeに追加
# Common initialization for ASRCAISim1 plugins
#     (1) Import plugins required by this plugin (and set as the plugin's attributes as usual.)
#     (2) If a C++ module exists, import it and set its attributes as the plugin's attributes.
#     (3) Add a FactoryHelper instance as 'factoryHelper' attribute.
##############################################
import sys
import ASRCAISim1
ASRCAISim1.common_init_for_plugin(sys.modules[__name__], globals())

##############################################
# ここから各ASRCAISim1プラグイン独自の初期化を記述する
# Individual initialization for each ASRCAISim1 plugin starts from here
##############################################
import os

from .R7ContestPyAgentSample01 import R7ContestPyAgentSample01
from .R7ContestPyRewardSample01 import R7ContestPyRewardSample01
from .R7ContestPyRewardSample02 import R7ContestPyRewardSample02

factoryHelper.addPythonClass('Agent','R7ContestPyAgentSample01',R7ContestPyAgentSample01)
factoryHelper.addPythonClass('Reward','R7ContestPyRewardSample01',R7ContestPyRewardSample01)
factoryHelper.addPythonClass('Reward','R7ContestPyRewardSample02',R7ContestPyRewardSample02)

