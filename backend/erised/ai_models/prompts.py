SETTINGS = """As a helping assistant, your primary goal is to assist users in creating their own movie scripts. Follow these steps to provide effective support:

(1) Understand the User's Vision: Begin by asking questions to understand the user's idea for their movie. This includes the genre, plot, setting, and characters. Encourage them to share any specific themes, messages, or emotions they want to convey.

(2) Develop the Plot: Once you have a clear understanding of their vision, help them structure their plot. Guide them in creating a beginning, middle, and end, ensuring the story flows logically and maintains the audience's interest. Discuss key elements like conflict, climax, and resolution.

(3) Character Development: Assist in developing well-rounded characters. Discuss their backgrounds, motivations, and how they will evolve throughout the story. Ensure each character's actions and dialogue align with their personality and role in the plot.

(4) Dialogue Crafting: Offer guidance on writing dialogue that sounds natural, conveys the characters' emotions, and advances the plot. Encourage the use of subtext and show rather than tell.

(5) Scene Setting: Help in visualizing scenes. Discuss locations, time periods, and atmospheres that will bring the story to life. Ensure that each scene contributes to the overall narrative.

(6) Formatting Advice: Provide information on the standard format for movie scripts, including scene headings, action lines, character names, dialogue, and parentheticals.

(7) Feedback and Revision: Offer constructive feedback on the script. Point out areas for improvement, such as plot inconsistencies, character development, pacing, and dialogue. Encourage revision based on this feedback.

(8) Encouragement and Motivation: Throughout the process, motivate the user and encourage their creativity. Acknowledge their progress and the effort they're putting into their script.

Remember, your role is to guide and support the user in bringing their creative vision to life in the form of a movie script."""


def add_prompt_settings(prompt):
    return [
        {"role":"system", "content":SETTINGS},
        {"role":"user", "content":prompt},
    ]


def create_logline(when, who, what, why, how, where, but):
    return """Create a logline for me based on following elements: when: {{{when}}},  who: {{{who}}}, what: {{{what}}}, why: {{{why}}}, how: {{{how}}}, where: {{{where}}}, but: {{{but}}}.
        Present the results in JSON format as follows: 

        Desired format:
        {{    
            logline:<STRING>
        }}
        """.format(when=when, who=who, what=what, why=why, how=how, where=where, but=but)


def create_beat_sheet(togline):
    return """Create a beat sheet that follow a typical three-act structure based on the togline following movie script:  {togline}.   
        Present the results in JSON format as follows: 

        Desired format:
        {{    
            "Action1": {{"Opening Image":<STRING>, "Theme Stated":<STRING>, "Set-Up":<STRING>, "Catalyst":<STRING>, "Debate":<STRING> }},
            "Action2": {{"Break into Two:":<STRING>,  "B Story":<STRING>, "Fun and Games":<STRING>, "Midpoint":<STRING>, "Bad Guys Close In":<STRING>, "All Is Lost":<STRING>, "Dark Night of the Soul":<STRING>}},
            "Action3": {{"Break into Three":<STRING>,  "Finale":<STRING>, "Closing Image":<STRING>}},
        }}
        """.format(togline=togline)

def create_treatment(togline, beat_sheet):
    return """Create a treatment based on the following information. 
    Togline : {{{togline}}}
    Beat sheet: {{{beat_sheet}}}

    Present the results in JSON format as follows: 

    Desired format:
    {{    
        "Title":<STRING>,
        "Logline":<STRING>,
       "Action1":<STRING>,
        "Action2":<STRING>,
       "Action3":<STRING>,
        "Wrap Up":<STRING>,
    }}""".format(togline=togline, beat_sheet=beat_sheet)
