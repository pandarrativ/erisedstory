class Witcher:
    username = "Geralt"
    script_name="The Witcher"
    subtitle = "Origional story written by Andrzej Sapkowski"
    author_profile = "/witcher/author_profile.jpg"
    first_story_image = "/witcher/first_image.png"
    first_story_keywords = "Geralt, monster, political, combat"
    image_path = "/witcher/charts/"
    image_counts = 40
    character_list = [
        {
            "name": "Geralt of Rivia", 
            "description": "A professional monster hunter with silver hair and cat-like eyes.",
            "url":"/witcher/ch_geralt.png"
        }, 
        {
            "name": "Yennefer of Vengerberg", 
            "description": "A powerful sorceress and Geralt's love interest, known for her raven black hair.",
            "url":"/witcher/ch_yennefer.png"
        }, 
        {
            "name": "Ciri",
            "description": "Princess of Cintra and a skilled warrior with extraordinary powers.",
            "url":"/witcher/ch_ciri.png"
            }, 
        {
            "name": "Triss Merigold", 
            "description": "A talented sorceress and Geralt's companion, known for her fiery red hair.",
            "url":"/witcher/ch_triss.png"
        }, 
        {
            "name": "Dandelion",
            "description": "Geralt's loyal friend, a bard with a passion for poetry and women.",
            "url":"/witcher/ch_dandelion.png"
        }
    ]



    story_description = """The story of The Witcher revolves around Geralt of Rivia, a skilled monster hunter in a world filled with dangerous creatures and political intrigue. Geralt is known as a Witcher, a mutated human created to combat monsters. He navigates a complex world where kingdoms fight for power and the line between good and evil is blurred. Along the way, Geralt meets friends like the sorceress Yennefer and the bard Dandelion, as well as his destiny, the young princess Ciri. The narrative delves into themes of discrimination, war, and moral choices. Geralt's journey is riddled with difficult decisions and his struggle to find his place in a chaotic world. Through his adventures, he faces supernatural beings, including powerful sorceresses, monstrous creatures, and his ultimate nemesis, the Wild Hunt. The story explores the complexities of loyalty, fate, and the definition of what it means to be human in a dark and dangerous reality. """

    first_story = "In the mystical realm of The Witcher, you become Geralt of Rivia, a legendary monster hunter. Embark on a perilous journey through treacherous lands, where dark forces lurk at every turn. As the Butcher of Blaviken, your path is intertwined with battles against terrifying creatures and political intrigues that shape the fate of nations. Forge alliances, make decisions with weighty consequences, and delve into your complex past as you unravel ancient prophecies. Will you succumb to the darkness or uphold your oath as a defender of humanity? The choice is yours, Geralt, and your destiny awaits. "
    
    prompt_head = "You are a story generator for a role-play game. The user plays the main character, and you create random follow-up stories, incorporating a sense of time passing, to help the user experience the entire narrative. This is the story: " + story_description 