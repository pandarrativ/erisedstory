class HarryPotter:
    username = "Harry"
    script_name="Harry Potter"
    subtitle = "Origional story written by J. K. Rowling"
    author_profile = "/harrypotter/author_profile.jpg"
    first_story_image = "/harrypotter/first_image.png"
    first_story_keywords = "Harry Potter, wizard, magical"
    image_path = "/harrypotter/charts/"
    image_counts = 30
    character_list = [
        {
            "name": "Harry Potter",
            "description": "The main protagonist, an orphan who discovers he is a wizard and attends Hogwarts School of Witchcraft and Wizardry.",
            "url":"/harrypotter/ch_harry.png",
        },
        {
            "name": "Hermione Granger",
            "description": "Harry's best friend and the top of their class, known for her intelligence, and helps Harry throughout his magical journey.",
            "url":"/harrypotter/ch_hermione.png",
        },
        {
            "name": "Ron Weasley",
            "description": "Harry's loyal and funny best friend, comes from a large and loving family, and supports Harry in his battles against evil.",
            "url":"/harrypotter/ch_ron.png",
        },
        {
            "name": "Albus Dumbledore",
            "description": "The wise and powerful headmaster of Hogwarts, protector of Harry, and a key strategist in the fight against Voldemort.",
            "url":"/harrypotter/ch_dumbledore.png",
        },
        {
            "name": "Lord Voldemort",
            "description": "The main antagonist, a dark wizard who seeks immortality and ultimate power, causing havoc in the wizarding world and threatening Harry's life.",
            "url":"/harrypotter/ch_voldmort.png",
        }
    ]

    story_description = """Harry Potter is a young wizard orphaned at birth. He discovers his magical abilities and attends Hogwarts School of Witchcraft and Wizardry. There, he becomes friends with Ron Weasley and Hermione Granger. The trio uncovers a plot by dark wizard Lord Voldemort to return to power. Harry learns of his connection to Voldemort, leading to dangerous encounters. As they progress through school, the trio faces challenges, such as battling a troll, solving puzzles, and facing Voldemort\'s followers. In later years, Harry competes in the Triwizard Tournament, faces the prophecy surrounding his fate, and fights in the Battle of Hogwarts. Ultimately, Harry confronts Voldemort, sacrificing himself to save his friends. However, he survives due to his mother\'s protection. In the final confrontation, Harry defeats Voldemort, ending his reign of terror and restoring peace to the wizarding world. """

    first_story = "In the enchanting world of magic, you step into the shoes of Harry Potter, the Boy Who Lived. Born on July 31, 1980, he hails from the non-magical Dursley family but is destined for greatness. An orphan raised by his cruel aunt and uncle, Harry discovered his extraordinary wizarding abilities on his 11th birthday when he received an acceptance letter from Hogwarts School of Witchcraft and Wizardry. With a lightning bolt scar on his forehead, he survived the dark wizard, Lord Voldemort, as a baby. As you embark on your journey, you'll learn about spells, potions, and the profound destiny that awaits you at Hogwarts. "

    # prompt_head = "You are a story generator. Now the user is going to have a role play game with you. He will play the main character in the story and you will randomly generate different stories to help user experience the story. This is the story: {" + story_description + "} " + "The following is the main characters in the story that the user may have a conversation with: " + str(character_list) +""
    prompt_head = "You are a story generator for a role-play game. The user plays the main character, and you create random follow-up stories, incorporating a sense of time passing, to help the user experience the entire narrative. This is the story: " + story_description 