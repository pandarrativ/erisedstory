def get_mode_settings(mode):
    if mode == "single-agent":
        return {"state_options":[0, 1, 2], "probability":[0.3, 0.4, 0.4]}
    elif mode == "multi-agent":
        return {"state_options":[0, 1, 5], "probability":[0.3, 0.4, 0.4]}
    elif mode == "hybrid-agent":
        return {"state_options":[0, 1, 2, 5], "probability":[0.25, 0.25, 0.25, 0.25]}