// Copyright (c) 2021-2025 Air Systems Research Center, Acquisition, Technology & Logistics Agency(ATLA)
#include "ObservationModifierBase.h"
#include "SimulationManager.h"

ASRC_NAMESPACE_BEGIN(asrc)
ASRC_NAMESPACE_BEGIN(core)
using namespace util;

void ObservationModifierBase::onGetObservationSpace(){
    BaseType::onGetObservationSpace();
    py::dict& observation_space=manager->observation_space();
    for(auto&& e:observation_space){
        std::string key=py::cast<std::string>(e.first);
        auto agent=getShared(manager->getAgent(key));
        observation_space[key.c_str()]=overrideObservationSpace(agent,py::cast<py::object>(e.second));
    }
}
void ObservationModifierBase::onMakeObs(){
    BaseType::onMakeObs();
    py::dict& observation=manager->observation();
    for(auto&& e:observation){
        std::string key=py::cast<std::string>(e.first);
        auto agent=getShared(manager->getAgent(key));
        observation[key.c_str()]=overrideObservation(agent,py::cast<py::object>(e.second));
    }
}
py::object ObservationModifierBase::overrideObservationSpace(const std::shared_ptr<Agent>& agent,py::object oldSpace){
    py::module_ spaces=py::module_::import("gymnasium.spaces");
    py::object tupleSpace=spaces.attr("Tuple");
    py::object dictSpace=spaces.attr("Dict");
    if(isinstance<ExpertWrapper>(agent)){
        auto ex=getShared<ExpertWrapper>(agent);
        return tupleSpace(py::make_tuple(
                    overrideObservationSpace(ex->imitator,py::cast<py::tuple>(oldSpace)[0]),
                    overrideObservationSpace(ex->expert,py::cast<py::tuple>(oldSpace)[1])
                ));
    }else if(isinstance<SimpleMultiPortCombiner>(agent)){
        auto com=getShared<SimpleMultiPortCombiner>(agent);
        py::dict ret;
        for(auto&& e:py::cast<py::dict>(oldSpace.attr("spaces"))){
            std::string key=py::cast<std::string>(e.first);
            ret[key.c_str()]=overrideObservationSpace(com->children[key],oldSpace[key.c_str()]);
        }
        return dictSpace(ret);
    }else{
        if(isTarget(agent)){
            return overrideObservationSpaceImpl(agent,oldSpace);
        }else{
            return oldSpace;
        }
    }
}
py::object ObservationModifierBase::overrideObservation(const std::shared_ptr<Agent>& agent,py::object oldObs){
    if(isinstance<ExpertWrapper>(agent)){
        auto ex=getShared<ExpertWrapper>(agent);
        return py::make_tuple(
                    overrideObservation(ex->imitator,py::cast<py::tuple>(oldObs)[0]),
                    overrideObservation(ex->expert,py::cast<py::tuple>(oldObs)[1])
                );
    }else if(isinstance<SimpleMultiPortCombiner>(agent)){
        auto com=getShared<SimpleMultiPortCombiner>(agent);
        py::dict ret;
        for(auto&& e:py::cast<py::dict>(oldObs)){
            std::string key=py::cast<std::string>(e.first);
            if(key=="isAlive"){
                ret[key.c_str()]=e.second;
            }else{
                ret[key.c_str()]=overrideObservation(com->children[key],oldObs[key.c_str()]);
            }
        }
        return ret;
    }else{
        if(isTarget(agent)){
            return overrideObservationImpl(agent,oldObs);
        }else{
            return oldObs;
        }
    }
}

void exportObservationModifierBase(py::module &m, const std::shared_ptr<asrc::core::FactoryHelper>& factoryHelper)
{
    using namespace pybind11::literals;
    expose_entity_subclass<ObservationModifierBase>(m,"ObservationModifierBase")
    DEF_FUNC(ObservationModifierBase,overrideObservationSpace)
    DEF_FUNC(ObservationModifierBase,overrideObservationSpaceImpl)
    DEF_FUNC(ObservationModifierBase,overrideObservation)
    DEF_FUNC(ObservationModifierBase,overrideObservationImpl)
    DEF_FUNC(ObservationModifierBase,isTarget)
    ;
}

ASRC_NAMESPACE_END(core)
ASRC_NAMESPACE_END(asrc)
