class HarryPotter:
    protagonist_name = "Harry"
    story_name="Harry Potter"
    story_id= '736f45b0-70d9-483b-8f02-8e9507fc31b9'
    story_description = "Magic school adventure with friends!"

    first_story = "Harry, you just arrived at Hogwarts. Your magical adventure with spells and friends begins."
    
    story_bg = "/harrypotter/first_image.png"
    protagonist_profile = "/harrypotter/ch_harry.png"

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
