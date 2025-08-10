var a198031 =
[
    [ "第4回空戦AIチャレンジの戦闘場面", "a198030.html", [
      [ "場面設定の概要", "a198030.html#section_r7_contest_scenario_overview", [
        [ "シミュレーション及び行動判断の周期", "a198030.html#section_r7_contest_scenario_tick", null ],
        [ "戦闘空間の定義", "a198030.html#section_r7_contest_scenario_combat_area", null ],
        [ "戦闘のルール", "a198030.html#section_r7_contest_scenario_combat_rule", [
          [ "終了条件", "a198030.html#section_r7_contest_scenario_combat_termination", null ],
          [ "戦闘機の初期配置", "a198030.html#section_r7_contest_scenario_initial_state_of_fighters", null ],
          [ "護衛対象機の初期配置と行動", "a198030.html#section_r7_contest_scenario_escorted_aircraft", null ],
          [ "戦闘機の機体性能のランダム化", "a198030.html#section_r7_contest_scenario_fighter_spec", null ]
        ] ],
        [ "航空機のモデル", "a198030.html#section_r7_contest_scenario_fighter_model", [
          [ "運動・飛行制御モデル", "a198030.html#section_r7_contest_scenario_fighter_flight_dynamics_and_control", [
            [ "運動モデル", "a198030.html#section_r7_contest_scenario_fighter_flight_dynamics", null ]
          ] ],
          [ "飛行制御モデル", "a198030.html#section_r7_contest_scenario_fighter_flight_control", null ],
          [ "センサモデル", "a198030.html#section_r7_contest_scenario_fighter_sensor", [
            [ "相手側航空機の探知（レーダ）", "a198030.html#section_r7_contest_scenario_fighter_radar", null ],
            [ "相手側誘導弾の探知（MWS）", "a198030.html#section_r7_contest_scenario_fighter_mws", null ]
          ] ],
          [ "ネットワークによる情報共有", "a198030.html#section_r7_contest_scenario_fighter_datalink", null ],
          [ "人間による介入の模擬", "a198030.html#section_r7_contest_scenario_fighter_human_intervention", null ],
          [ "武装モデル", "a198030.html#section_r7_contest_scenario_weapon", null ]
        ] ],
        [ "誘導弾のモデル", "a198030.html#section_r7_contest_scenario_missile_model", [
          [ "運動・飛行制御モデル", "a198030.html#section_r7_contest_scenario_missile_flight_dynamics_and_control", [
            [ "空気力モデル", "a198030.html#section_r7_contest_scenario_missile_aerodynamics", null ],
            [ "推力モデル", "a198030.html#section_r7_contest_scenario_missile_flight_propulsion", null ],
            [ "運動モデル", "a198030.html#section_r7_contest_scenario_missile_flight_dynamics", null ],
            [ "飛行制御モデル", "a198030.html#section_r7_contest_scenario_missile_flight_control", null ]
          ] ],
          [ "最大飛翔時間及び命中判定", "a198030.html#section_r7_contest_scenario_missile_termination", null ],
          [ "センサモデル", "a198030.html#section_r7_contest_scenario_missile_sensor", null ]
        ] ]
      ] ],
      [ "設定値の一覧", "a198030.html#section_r7_contest_scenario_parameters", null ],
      [ "参考文献", "a198030.html#section_r7_contest_scenario_citation", null ]
    ] ],
    [ "第4回空戦AIチャレンジ向けのMatchMaker", "a198028.html", [
      [ "configの追加要素", "a198028.html#section_r7_contest_match_maker_config", null ],
      [ "機体性能のランダム化(オープン部門向け)", "a198028.html#section_r7_contest_match_maker_randomization", null ],
      [ "護衛対象機を含めたManager初期配置の設定", "a198028.html#section_r7_contest_match_maker_initial_state", null ]
    ] ],
    [ "Agent が入出力 observables と commands の形式", "a198024.html", [
      [ "Agent が受け取ることのできる observables", "a198024.html#section_r7_contest_agent_observables", [
        [ "誘導弾に関するobservables", "a198024.html#section_r7_contest_missile_observables", null ]
      ] ],
      [ "Agent が出力すべき commands", "a198024.html#section_r7_contest_agent_commands", null ],
      [ "Agent が アクセス可能な Accessor", "a198024.html#section_r7_contest_agent_accessible_accessors", null ]
    ] ],
    [ "ルールベースの初期行動判断モデル", "a198027.html", [
      [ "航跡に対する付帯情報", "a198027.html#r7_contest_initial_rulebased_agent_trackinfo", null ],
      [ "目標選択", "a198027.html#r7_contest_initial_rulebased_agent_target_selection", null ],
      [ "行動の種類", "a198027.html#r7_contest_initial_rulebased_agent_state", null ],
      [ "(s1)通常時の行動", "a198027.html#r7_contest_initial_rulebased_agent_normal_state", null ],
      [ "(a1)射撃", "a198027.html#r7_contest_initial_rulebased_agent_shoot", null ],
      [ "(s2)離脱", "a198027.html#r7_contest_initial_rulebased_agent_withdrawal", null ],
      [ "(s3)回避", "a198027.html#r7_contest_initial_rulebased_agent_evasion", null ],
      [ "針路の補正", "a198027.html#r7_contest_initial_rulebased_agent_route_correction", null ],
      [ "目標進行方向及び目標速度の計算方法", "a198027.html#r7_contest_initial_rulebased_agent_command_calculation", [
        [ "方向指示", "a198027.html#r7_contest_initial_rulebased_agent_command_direction", null ],
        [ "速度指示", "a198027.html#r7_contest_initial_rulebased_agent_command_velocity", null ]
      ] ]
    ] ],
    [ "第4回空戦AIチャレンジ向け強化学習 Agent サンプル", "a198025.html", [
      [ "実装の概要", "a198025.html#section_r7_contest_agent_sample_overview", [
        [ "observablesの抽出", "a198025.html#section_r7_contest_agent_sample_extract_observables", null ],
        [ "observationの形式", "a198025.html#section_r7_contest_agent_sample_observation", null ],
        [ "actionの形式", "a198025.html#section_r7_contest_agent_sample_action", null ],
        [ "行動制限について", "a198025.html#section_r7_contest_agent_sample_action_limit", null ],
        [ "メンバ変数", "a198025.html#section_r7_contest_agent_sample_member_variables", [
          [ "modelConfigで設定するもの", "a198025.html#section_r7_contest_agent_sample_member_variables_from_modelConfig", null ],
          [ "内部変数", "a198025.html#section_r7_contest_agent_sample_member_variables_internal_state", null ]
        ] ]
      ] ]
    ] ],
    [ "第4回空戦AIチャレンジ向け強化学習 Reward サンプル", "a198029.html", [
      [ "サンプルその1の概要", "a198029.html#section_r7_contest_reward_sample_01_overview", null ],
      [ "サンプルその2の概要", "a198029.html#section_r7_contest_reward_sample_02_overview", null ]
    ] ],
    [ "HandyRL(の改変版)を用いた強化学習サンプル", "a198026.html", [
      [ "元の HandyRL に対する改変・機能追加の概要", "a198026.html#section_r7_contest_handyrl_sample_modification", null ],
      [ "学習の実行方法", "a198026.html#section_r7_contest_handyrl_sample_run_train", null ],
      [ "学習済モデルの評価", "a198026.html#section_r7_contest_handyrl_sample_run_evaluation", null ],
      [ "yaml の記述方法", "a198026.html#section_r7_contest_handyrl_sample_yaml_format", null ],
      [ "yaml で定義可能なニューラルネットワークのサンプル", "a198026.html#section_r7_contest_handyrl_sample_nn", null ],
      [ "カスタムクラスの使用", "a198026.html#section_r7_contest_handyrl_sample_custom_classes", null ],
      [ "学習ログの構成", "a198026.html#section_r7_contest_handyrl_sample_logging", null ]
    ] ],
    [ "異なる行動判断モデル同士を対戦させるための機能", "a198023.html", [
      [ "Agent 及び Policy のパッケージ化の方法", "a198023.html#section_r7_contest_agent_as_package", [
        [ "サンプルプラグインを改変していた場合のパッケージ化", "a198023.html#section_r7_contest_agent_as_package_with_modified_sample", null ],
        [ "C++を使用した独自プラグインを作成して使用する場合の推奨事項", "a198023.html#section_r7_contest_custom_cpp_plugin", null ]
      ] ],
      [ "パッケージ化された Agent 及び Policy の組を読み込んで対戦させるサンプル", "a198023.html#section_r7_contest_minimum_evaluation", null ]
    ] ]
];