class ThreeBody:
    username = "Wenjie"
    script_name="The Three-Body Problem"
    subtitle = "Origional story written by Liu Cixin"
    author_profile = "/threebody/author_profile.jpg"
    first_story_image = "/threebody/first_image.png"
    first_story_keywords = "Science fiction, alien , game theory"
    image_path = "/threebody/charts/"
    image_counts = 40
    character_list = [
        {
            "name": "Ye Wenjie",
            "description": "A highly intelligent astrophysicist who sends a message to aliens, initiating contact with a potential alien civilization.",
            "url":"/threebody/ch_wenjie.png",
        },
        {
            "name": "Wang Miao",
            "description": "A nanomaterials researcher pulled into a virtual reality game called Three-Body, where players face the threat of an impending alien invasion.",
            "url":"/threebody/ch_miao.png",
        },
        {
            "name": "Shi Qiang",
            "description": "A tough detective with a background in military intelligence, assigned to investigate a series of mysterious deaths related to the Three-Body game.",
            "url":"/threebody/ch_qiang.png",
        },
        {
            "name": "Zhang Beihai",
            "description": "A retired Red Coast military officer who enters the Three-Body game and becomes a key player in the underground battle against the Trisolaran civilization.",
            "url":"/threebody/ch_beihai.png",
        },
        {
            "name": "Da Shi",
            "description": "An influential figure within the mysterious organization ETO, pulling the strings behind the scenes to manipulate events related to the Three-Body game.",
            "url":"/threebody/ch_shi.png",
        }
    ]

    story_description = """The Three-Body Problem" is a science fiction novel that explores humanity's response to an impending alien invasion. In the 1960s, astrophysicist Ye Wenjie witnesses the devastating consequences of society's stagnation and betrayal, leading her to transmit a message to outer space to contact aliens. After the message reaches the extraterrestrial Trisolarans, they initiate a plan to invade Earth. Years later, nanotechnology scientist Wang Miao gets entangled in a virtual reality game called Three-Body, driven by the dark history of the Trisolarans and a secret organization that opposes their invasion. Through complex narrative threads, the story delves into the complexities of science, human nature, and the consequences of contact with an advanced alien civilization. """

    first_story = "You find yourself stepping into the shoes of Wenjie, a brilliant astrophysicist. The world teeters on the brink of chaos, with humanity's survival hanging in the balance. As a key player in a secret project, you uncover a hidden truth - an impending alien invasion. With the countdown ticking, you must navigate the intricate web of deceit, betrayal, and scientific mysteries to save Earth. Embark on a treacherous journey filled with mind-bending discoveries, perilous alliances, and ethical dilemmas. Can you unravel the enigma of the Three-Body Problem and safeguard humanity from its impending doom? "
   
    prompt_head = "You are a story generator for a role-play game. The user plays the main character, and you create random follow-up stories, incorporating a sense of time passing, to help the user experience the entire narrative. This is the story: " + story_description 