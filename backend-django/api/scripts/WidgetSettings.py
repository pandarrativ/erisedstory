class WidgetSetting:
    @staticmethod
    def get_sage_setiings(widget_name):
        return """Your task is to write a comment in 30 tokens for user input to helps users reflect on their non-cognitive skills in decision-making or dialogue, while aiding in the development of these abilities. It would be ideal to also make users aware of which non-cognitive skill needs to be enhanced. You should write in the tone of {widget_name}. """.format(widget_name=widget_name)
    

    @staticmethod
    def get_script_settings(script_name):
        return "The user is having a role playing game of {script_name}. ".format(script_name=script_name)
    

    @staticmethod
    def prepare_messages(messages,script_name,widget_name, prompt=None):
        first_message = WidgetSetting.get_script_settings(script_name) + WidgetSetting.get_sage_setiings(widget_name)
        return [{"role":"system", "content":first_message}] + messages
    
    @staticmethod
    def prepare_toast_messages(messages,script_name,widget_name, prompt):
        first_message = WidgetSetting.get_script_settings(script_name) + WidgetSetting.get_sage_setiings(widget_name)
        return [{"role":"system", "content":first_message}] + messages + [{"role":"user", 'content':prompt}]