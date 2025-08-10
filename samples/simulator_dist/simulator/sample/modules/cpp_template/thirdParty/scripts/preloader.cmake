#Copyright (c) 2024-2025 Air Systems Research Center, Acquisition, Technology & Logistics Agency(ATLA)
#----------------------------------------------------------------
# A template script for getting CMAKE_PREFIX_PATH and other cache variables from ASRC core simulator and plugins.
# This is mainly used to notify where are third-party dependencies located.
# Give this file as -C option of cmake command to build third-party dependencies.
#----------------------------------------------------------------

set(PythonLibsNew_FIND_VERSION $ENV{PythonLibsNew_FIND_VERSION})
#----------------------------------------------------------------
# core simulator and core plugins
#----------------------------------------------------------------
list(APPEND CMAKE_PREFIX_PATH $ENV{ASRC_CMAKE_PREFIX_PATH})
find_package(ASRCAISim1 REQUIRED)

#----------------------------------------------------------------
# user plugins
#----------------------------------------------------------------
foreach(_PLUGIN_DIR $ENV{ASRC_USER_PLUGIN_DIRS})
    get_filename_component(_PLUGIN_NAME ${_PLUGIN_DIR} NAME_WE)
    find_package(${_PLUGIN_NAME} REQUIRED)
endforeach()

message(STATUS "CMAKE_PREFIX_PATH=${CMAKE_PREFIX_PATH}")
