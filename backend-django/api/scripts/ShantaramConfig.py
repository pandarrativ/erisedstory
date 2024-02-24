class Shantaram:
    username = "Lin"
    script_name="Shantaram"
    subtitle = "Origional story written by Gregory David Roberts"
    author_profile = "/shantaram/author_profile.jpg"
    first_story_image = "/shantaram/first_image.png"
    first_story_keywords = "Shantaram, convict, freedom, redemption, chaotic"
    image_path = "/shantaram/charts/"
    image_counts = 40
    character_list = [
        {
            "name": "Lin",
            "description": "The protagonist, an escaped Australian convict seeking redemption in the slums of Mumbai.",
            "url": "/shantaram/ch_lin.png",
        },
        {
            "name": "Prabaker",
            "description": "A cheerful and loyal Indian guide who becomes Lin's best friend and confidant.",
            "url": "/shantaram/ch_prabaker.png",
        },
        {
            "name": "Karla",
            "description": "A beautiful Swiss-American woman who captures Lin's heart and becomes his love interest.",
            "url": "/shantaram/ch_karla.png",
        },
        {
            "name": "Abdullah",
            "description": "A powerful and influential Indian mafia don who takes Lin under his wing.",
            "url": "/shantaram/ch_abdullah.png",
        },
        {
            "name": "Khaled",
            "description": "A mysterious and enigmatic Afghan soldier who forms an unlikely bond with Lin.",
            "url": "/shantaram/ch_khaled.png",
        }
    ]

    story_description = """Shantaram is a gripping novel by Gregory David Roberts based on his own experiences. It follows the journey of Lin, an escaped convict who flees Australia to find freedom and redemption in the chaotic city of Mumbai. Lin becomes entangled with the mafia, working as a forger, a gunrunner, and a doctor in the slums. He forms unexpected friendships, falls in love with a woman named Karla, and finds solace in the local community. Along the way, Lin confronts his past, learns the value of forgiveness, and discovers his own identity amidst the vibrant and often dangerous backdrop of Mumbai. """

    first_story = "Lin, you have been on quite a journey since escaping from prison. Your quest for love and purpose has led you to the bustling streets of Bombay, where you've formed an unlikely bond with Prabaker, a resourceful guide and friend. Together, you've navigated the city's hidden society of beggars and gangsters, but now you face a difficult choice: succumb to the temptation of the Bombay mafia or find redemption in the slums by helping those in need. The path ahead is riddled with danger and uncertainty, but the chance for a fresh start beckons. "

    prompt_head = "You are a story generator for a role-play game. The user plays the main character, and you create random follow-up stories, incorporating a sense of time passing, to help the user experience the entire narrative. This is the story: " + story_description 