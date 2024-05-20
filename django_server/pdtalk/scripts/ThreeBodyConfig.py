class ThreeBody:
    protagonist_name = "Wenjie"
    story_name="The Three-Body Problem"
    story_id= 'f10952fa-4cc0-4a3c-b151-242985abc7fc'


    story_description = "Aliens disrupt human science, society."
    first_story = "Wang Miao, you discover alien messages and face big challenges to save Earth with science. "

    story_bg = "//threebody/first_image.png"
    protagonist_profile = "/threebody/ch_wenjie.png"

    @classmethod
    def get_script_info(cls):
        return {
            "protagonist_name": cls.protagonist_name,
            "story_name": cls.story_name,
            "story_id": cls.story_id,
            "story_description": cls.story_description,            
            "story_bg": cls.story_bg,
            "protagonist_profile": cls.protagonist_profile,
        }