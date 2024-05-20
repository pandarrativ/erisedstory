class Witcher:
    protagonist_name = "Geralt"
    story_name="The Witcher"
    story_id= '25410127-cd23-4eea-a092-277cc6c9647c'

    story_description = "Monster hunter in magical conflict."
    first_story = "You, Geralt, are a Witcher. You hunt monsters, find friends, and solve secrets in a world full of magic. "
    
    story_bg = "/witcher/first_image.png"
    protagonist_profile = "/witcher/ch_geralt.png"

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