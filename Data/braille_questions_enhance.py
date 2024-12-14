import random
import pandas as pd
import csv

# Basic Braille mappings
BRAILLE_BASIC = {
    # Letters
    'A': '⠁', 'B': '⠃', 'C': '⠉', 'D': '⠙', 'E': '⠑',
    'F': '⠋', 'G': '⠛', 'H': '⠓', 'I': '⠊', 'J': '⠚',
    'K': '⠅', 'L': '⠇', 'M': '⠍', 'N': '⠝', 'O': '⠕',
    'P': '⠏', 'Q': '⠟', 'R': '⠗', 'S': '⠎', 'T': '⠞',
    'U': '⠥', 'V': '⠧', 'W': '⠺', 'X': '⠭', 'Y': '⠽',
    'Z': '⠵',
    # Numbers
    '1': '⠼⠁', '2': '⠼⠃', '3': '⠼⠉', '4': '⠼⠙', '5': '⠼⠑',
    '6': '⠼⠋', '7': '⠼⠛', '8': '⠼⠓', '9': '⠼⠊', '0': '⠼⠚',
    # Special Characters
    '.': '⠲', ',': '⠂', '!': '⠖', '?': '⠦', 
    "'": '⠄', '"': '⠐⠂', ';': '⠆', ':': '⠒',
    '(': '⠐⠣', ')': '⠐⠜', '-': '⠤', '_': '⠨⠤',
    # Space
    ' ': ' '
}

# Reverse mapping for translation back to text
BRAILLE_TO_TEXT = {v: k for k, v in BRAILLE_BASIC.items()}

def text_to_braille(text: str) -> str:
    """Convert text to Braille."""
    try:
        return ''.join(BRAILLE_BASIC.get(char.upper(), char) for char in text)
    except Exception as e:
        return f"Error in translation: {str(e)}"

def braille_to_text(braille: str) -> str:
    """Convert Braille to text."""
    try:
        # Split into characters (each Braille character is 2-3 Unicode chars)
        chars = []
        i = 0
        while i < len(braille):
            if braille[i:i+2] in BRAILLE_TO_TEXT:
                chars.append(braille[i:i+2])
                i += 2
            elif braille[i:i+3] in BRAILLE_TO_TEXT:
                chars.append(braille[i:i+3])
                i += 3
            else:
                chars.append(braille[i])
                i += 1
                
        return ''.join(BRAILLE_TO_TEXT.get(char, char) for char in chars)
    except Exception as e:
        return f"Error in translation: {str(e)}"

def generate_stage1_questions(total_stages=10):
    """Generate Stage 1 questions with sequential IDs (1-100)"""
    questions = []
    current_id = 1  # Start from 1
    
    # Questions per stage
    questions_per_stage = 10
    easy_per_stage = 5
    medium_per_stage = 3
    hard_per_stage = 2
    
    # Separate mappings
    letters = {k: v for k, v in BRAILLE_BASIC.items() if k.isalpha()}
    numbers = {k: v for k, v in BRAILLE_BASIC.items() if k.isdigit()}
    special = {k: v for k, v in BRAILLE_BASIC.items() 
              if not k.isalpha() and not k.isdigit() and k != ' '}
    
    for stage in range(1, total_stages + 1):
        # Generate Easy Questions (Letters)
        for i in range(easy_per_stage):
            correct_letter, correct_braille = random.choice(list(letters.items()))
            wrong_letters = random.sample([k for k in letters.keys() if k != correct_letter], 3)
            options = wrong_letters + [correct_letter]
            random.shuffle(options)
            
            questions.append({
                'Q_ID': str(current_id),  # Convert to string to match existing format
                'Q_text': f"What letter does this Braille pattern represent: '{correct_braille}'?",
                'Q_Braille_Symbol': correct_braille,
                'Q_answer': correct_letter,
                'Q_A1': options[0],
                'Q_A2': options[1],
                'Q_A3': options[2],
                'Q_A4': options[3],
                'Q_difficulty': '1',
                'Q_stage': stage
            })
            current_id += 1
        
        # Generate Medium Questions (Combined Numbers/Special)
        for i in range(medium_per_stage):
            # Alternate between numbers and special characters
            if i % 2 == 0:
                correct_char, correct_braille = random.choice(list(numbers.items()))
                wrong_chars = random.sample([k for k in numbers.keys() if k != correct_char], 3)
                char_type = "number"
            else:
                correct_char, correct_braille = random.choice(list(special.items()))
                wrong_chars = random.sample([k for k in special.keys() if k != correct_char], 3)
                char_type = "special character"
                
            options = wrong_chars + [correct_char]
            random.shuffle(options)
            
            questions.append({
                'Q_ID': str(current_id),
                'Q_text': f"What {char_type} does this Braille pattern represent: '{correct_braille}'?",
                'Q_Braille_Symbol': correct_braille,
                'Q_answer': correct_char,
                'Q_A1': options[0],
                'Q_A2': options[1],
                'Q_A3': options[2],
                'Q_A4': options[3],
                'Q_difficulty': '2',
                'Q_stage': stage
            })
            current_id += 1
        
        # Generate Hard Question (Combined)
        char1, braille1 = random.choice(list(BRAILLE_BASIC.items()))
        char2, braille2 = random.choice(list(BRAILLE_BASIC.items()))
        combined_text = char1 + char2
        combined_braille = braille1 + braille2
        
        wrong_options = []
        for _ in range(3):
            w1, _ = random.choice(list(BRAILLE_BASIC.items()))
            w2, _ = random.choice(list(BRAILLE_BASIC.items()))
            wrong_options.append(w1 + w2)
        
        options = wrong_options + [combined_text]
        random.shuffle(options)
        
        questions.append({
            'Q_ID': str(current_id),
            'Q_text': f"What combination does this Braille pattern represent: '{combined_braille}'?",
            'Q_Braille_Symbol': combined_braille,
            'Q_answer': combined_text,
            'Q_A1': options[0],
            'Q_A2': options[1],
            'Q_A3': options[2],
            'Q_A4': options[3],
            'Q_difficulty': '3',
            'Q_stage': stage
        })
        current_id += 1
    
    save_questions_to_csv(questions, 'stage1_questions.csv')
    return questions

def generate_stage2_questions(total_stages=10):
    """Generate Stage 2 questions with sequential IDs (101-200)"""
    questions = []
    current_id = 101  # Start from 101
    
    # Questions per stage
    questions_per_stage = 10
    easy_per_stage = 5
    medium_per_stage = 3
    hard_per_stage = 2
    
    # Keep word pools...
    short_words = [
        'CAT', 'DOG', 'RUN', 'SIT', 'HAT', 'BED', 'TOP', 'MAP', 'RAT', 'FUN',
        'BIG', 'SKY', 'SUN', 'MOM', 'DAD', 'PEN', 'CUP', 'BOX', 'RED', 'CAR',
        'BUS', 'EGG', 'FOX', 'JAM', 'KEY', 'LEG', 'NET', 'PIE', 'SAD', 'TEA',
        'VAN', 'WIN', 'YES', 'ZOO', 'BAG', 'FLY', 'GYM', 'HUG', 'INK', 'JOY',
        'BAT', 'DIM', 'FAR', 'GAS', 'HIT', 'ICE', 'JAR', 'KIT', 'LID', 'MAP',
        'NAP', 'OWL', 'PIG', 'RIM', 'SAW', 'TIP', 'USE', 'WEB', 'YET', 'ZIP',
        'ACT', 'AIR', 'ANT', 'ART', 'ASK', 'AXE', 'BAD', 'BEE', 'BIT', 'BOW',
        'BUY', 'CAN', 'COW', 'CRY', 'CUT', 'DAY', 'DEW', 'DRY', 'DUG', 'EAR',
        'EAT', 'END', 'EYE', 'FAN', 'FEW', 'FIT', 'FLU', 'GET', 'GOT', 'GUN'
    ]
    
    common_words = [
        'HELLO', 'WATER', 'HELP', 'THANK', 'HOME', 'SCHOOL', 'PLAY', 'FAMILY',
        'FRIEND', 'HAPPY', 'SMILE', 'PAPER', 'CHAIR', 'TABLE', 'PHONE', 'BOOK',
        'LUNCH', 'DINNER', 'HOUSE', 'MUSIC', 'DANCE', 'WRITE', 'SLEEP', 'DREAM',
        'LAUGH', 'STUDY', 'LEARN', 'TEACH', 'SPEAK', 'LISTEN', 'WATCH', 'WORK',
        'PARTY', 'CHILD', 'LIGHT', 'MONEY', 'MOVIE', 'NIGHT', 'QUIET', 'STORY',
        'THINK', 'PLANT', 'CLOUD', 'BEACH', 'SWEET', 'BREAD', 'FRUIT', 'TRAIN',
        'ABOUT', 'ABOVE', 'AFTER', 'AGAIN', 'ALARM', 'ALBUM', 'ALIVE', 'ALLOW',
        'ALONE', 'ALONG', 'ANGER', 'ANGLE', 'ANGRY', 'APPLE', 'APRIL', 'ARENA',
        'ARGUE', 'ARISE', 'ARRAY', 'ARROW', 'ASIDE', 'AUGUST', 'AVOID', 'BACON'
    ]
    
    long_words = [
        'BEAUTIFUL', 'EXCELLENT', 'WONDERFUL', 'CHALLENGE', 'ADVENTURE',
        'EDUCATION', 'KNOWLEDGE', 'HAPPINESS', 'SUNSHINE', 'COMMUNITY',
        'IMPORTANT', 'PRACTICE', 'QUESTION', 'LEARNING', 'TOGETHER',
        'TOMORROW', 'AMAZING', 'FRIENDLY', 'STRENGTH', 'COURAGE',
        'DIFFERENT', 'BUTTERFLY', 'CELEBRATE', 'CHOCOLATE', 'DANGEROUS',
        'ENGINEER', 'FANTASTIC', 'GRATEFUL', 'HOSPITAL', 'INTERNET',
        'MOUNTAIN', 'PEACEFUL', 'REMEMBER', 'SUDDENLY', 'UMBRELLA',
        'ADVENTURE', 'BLUEPRINT', 'CAMPAIGN', 'DECISION', 'EXERCISE',
        'FAVORITE', 'GENEROUS', 'HERITAGE', 'INDUSTRY', 'JEALOUSY',
        'KEYBOARD', 'LANGUAGE', 'MEDICINE', 'NOTEBOOK', 'ORIGINAL',
        'PATIENCE', 'QUANTITY', 'RESEARCH', 'SCHEDULE', 'TECHNIQUE'
    ]
    
    for stage in range(11, 21):  # Stages 11-20
        # Generate Easy Questions (Short Words)
        for i in range(easy_per_stage):
            correct_word = random.choice(short_words)
            correct_braille = text_to_braille(correct_word)
            wrong_words = random.sample([w for w in short_words if w != correct_word], 3)
            options = wrong_words + [correct_word]
            random.shuffle(options)
            
            questions.append({
                'Q_ID': str(current_id),
                'Q_text': f"What word does this Braille pattern represent: '{correct_braille}'?",
                'Q_Braille_Symbol': correct_braille,
                'Q_answer': correct_word,
                'Q_A1': options[0],
                'Q_A2': options[1],
                'Q_A3': options[2],
                'Q_A4': options[3],
                'Q_difficulty': '1',
                'Q_stage': stage
            })
            current_id += 1
        
        # Generate Medium Questions (Common Words)
        for i in range(medium_per_stage):
            correct_word = random.choice(common_words)
            correct_braille = text_to_braille(correct_word)
            wrong_words = random.sample([w for w in common_words if w != correct_word], 3)
            options = wrong_words + [correct_word]
            random.shuffle(options)
            
            questions.append({
                'Q_ID': str(current_id),
                'Q_text': f"What word does this Braille pattern represent: '{correct_braille}'?",
                'Q_Braille_Symbol': correct_braille,
                'Q_answer': correct_word,
                'Q_A1': options[0],
                'Q_A2': options[1],
                'Q_A3': options[2],
                'Q_A4': options[3],
                'Q_difficulty': '2',
                'Q_stage': stage
            })
            current_id += 1
        
        # Generate Hard Question (Long Words)
        correct_word = random.choice(long_words)
        correct_braille = text_to_braille(correct_word)
        wrong_words = random.sample([w for w in long_words if w != correct_word], 3)
        options = wrong_words + [correct_word]
        random.shuffle(options)
        
        questions.append({
            'Q_ID': str(current_id),
            'Q_text': f"What word does this Braille pattern represent: '{correct_braille}'?",
            'Q_Braille_Symbol': correct_braille,
            'Q_answer': correct_word,
            'Q_A1': options[0],
            'Q_A2': options[1],
            'Q_A3': options[2],
            'Q_A4': options[3],
            'Q_difficulty': '3',
            'Q_stage': stage
        })
        current_id += 1
    
    save_questions_to_csv(questions, 'stage2_questions.csv')
    return questions

def generate_stage3_questions(total_stages=10):
    """Generate Stage 3 questions with sequential IDs (201-300)"""
    questions = []
    current_id = 201  # Start from 201
    
    # Questions per stage
    questions_per_stage = 10
    easy_per_stage = 7
    medium_per_stage = 2
    hard_per_stage = 1
    
    # Phrase pools
    simple_phrases = [
        'GOOD MORNING', 'THANK YOU', 'HOW ARE YOU', 'NICE TO MEET YOU', 
        'SEE YOU LATER', 'HAVE A NICE DAY', 'GOOD NIGHT', 'WHAT TIME IS IT',
        'MY NAME IS', 'WHERE ARE YOU', 'I LIKE IT', 'LETS GO NOW',
        'CAN YOU HELP', 'PLEASE AND THANK YOU', 'SEE YOU TOMORROW'
    ]
    
    common_phrases = [
        'HOW CAN I HELP YOU', 'WHAT DO YOU THINK', 'I NEED MORE TIME',
        'WOULD YOU LIKE COFFEE', 'CAN YOU EXPLAIN THIS', 'LET ME THINK ABOUT IT',
        'DO YOU UNDERSTAND ME', 'THANKS FOR YOUR HELP', 'TELL ME MORE ABOUT IT',
        'WHERE SHOULD WE MEET', 'WHAT ARE YOUR PLANS', 'HOW WAS YOUR DAY'
    ]
    
    complex_phrases = [
        'COULD YOU PLEASE EXPLAIN THAT AGAIN', 'I WOULD APPRECIATE YOUR HELP',
        'WHAT DO YOU THINK ABOUT THIS IDEA', 'LET ME KNOW WHEN YOU ARE READY',
        'THANK YOU FOR YOUR CONSIDERATION', 'PLEASE TAKE YOUR TIME TO DECIDE',
        'IT WAS A PLEASURE MEETING YOU', 'I LOOK FORWARD TO SEEING YOU AGAIN',
        'WOULD YOU MIND HELPING ME WITH THIS', 'HAVE A WONDERFUL DAY AHEAD'
    ]
    
    for stage in range(21, 31):  # Stages 21-30
        # Generate Easy Questions (Simple Phrases)
        for i in range(easy_per_stage):
            correct_phrase = random.choice(simple_phrases)
            correct_braille = text_to_braille(correct_phrase)
            wrong_phrases = random.sample([p for p in simple_phrases if p != correct_phrase], 3)
            options = wrong_phrases + [correct_phrase]
            random.shuffle(options)
            
            questions.append({
                'Q_ID': str(current_id),
                'Q_text': f"What phrase does this Braille pattern represent: '{correct_braille}'?",
                'Q_Braille_Symbol': correct_braille,
                'Q_answer': correct_phrase,
                'Q_A1': options[0],
                'Q_A2': options[1],
                'Q_A3': options[2],
                'Q_A4': options[3],
                'Q_difficulty': '1',
                'Q_stage': stage
            })
            current_id += 1
        
        # Generate Medium Questions (Common Phrases)
        for i in range(medium_per_stage):
            correct_phrase = random.choice(common_phrases)
            correct_braille = text_to_braille(correct_phrase)
            wrong_phrases = random.sample([p for p in common_phrases if p != correct_phrase], 3)
            options = wrong_phrases + [correct_phrase]
            random.shuffle(options)
            
            questions.append({
                'Q_ID': str(current_id),
                'Q_text': f"What phrase does this Braille pattern represent: '{correct_braille}'?",
                'Q_Braille_Symbol': correct_braille,
                'Q_answer': correct_phrase,
                'Q_A1': options[0],
                'Q_A2': options[1],
                'Q_A3': options[2],
                'Q_A4': options[3],
                'Q_difficulty': '1',
                'Q_stage': stage
            })
            current_id += 1
        
        # Generate Hard Question (Complex Phrases)
        correct_phrase = random.choice(complex_phrases)
        correct_braille = text_to_braille(correct_phrase)
        wrong_phrases = random.sample([p for p in complex_phrases if p != correct_phrase], 3)
        options = wrong_phrases + [correct_phrase]
        random.shuffle(options)
        
        questions.append({
            'Q_ID': str(current_id),
            'Q_text': f"What phrase does this Braille pattern represent: '{correct_braille}'?",
            'Q_Braille_Symbol': correct_braille,
            'Q_answer': correct_phrase,
            'Q_A1': options[0],
            'Q_A2': options[1],
            'Q_A3': options[2],
            'Q_A4': options[3],
            'Q_difficulty': '1',
            'Q_stage': stage
        })
        current_id += 1
    
    save_questions_to_csv(questions, 'stage3_questions.csv')
    return questions

def save_questions_to_csv(questions, filename):
    """Save questions to CSV with proper UTF-8 encoding for Braille"""
    fieldnames = ['Q_text', 'Q_Braille_Symbol', 'Q_answer', 'Q_A1', 'Q_A2', 'Q_A3', 'Q_A4', 
                 'Q_difficulty', 'Q_ID', 'Q_stage']
    
    # Write with UTF-8-SIG (UTF-8 with BOM) to properly handle Braille symbols
    with open(filename, 'w', newline='', encoding='utf-8-sig') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(questions)

def generate_all_stages():
    """Generate questions for all stages and save to single file"""
    all_questions = []
    
    # Generate questions for each stage
    stage1_questions = generate_stage1_questions()
    stage2_questions = generate_stage2_questions()
    stage3_questions = generate_stage3_questions()
    
    # Combine all questions
    all_questions.extend(stage1_questions)
    all_questions.extend(stage2_questions)
    all_questions.extend(stage3_questions)
    
    # Save combined questions
    save_questions_to_csv(all_questions, 'all_stages_questions.csv')
    return all_questions

# Update main() to include stage 2 and stage 3
def main():
    while True:
        print("\nBraille Learning System")
        print("1. Text to Braille")
        print("2. Braille to Text")
        print("3. Generate Questions")
        print("4. Generate All Stages")
        print("5. Exit")
        
        try:
            choice = input("Select option (1-5): ")
            
            if choice == '1':
                text = input("Enter text: ")
                result = text_to_braille(text)
                print(f"Braille: {result}")
                
            elif choice == '2':
                braille = input("Enter Braille: ")
                result = braille_to_text(braille)
                print(f"Text: {result}")
                
            elif choice == '3':
                stage = input("Select stage (1-Letters/Numbers, 2-Words, 3-Phrases): ")
                if stage == '1':
                    questions = generate_stage1_questions()
                elif stage == '2':
                    questions = generate_stage2_questions()
                elif stage == '3':
                    questions = generate_stage3_questions()
                print(f"Generated questions for Stage {stage}")
                print(f"Questions saved to 'stage{stage}_questions.csv'")
            
            elif choice == '4':
                questions = generate_all_stages()
                print("Generated questions for all stages")
                print("Questions saved to 'all_stages_questions.csv'")
            
            elif choice == '5':
                break
                
            else:
                print("Invalid option. Please choose 1-5.")
                
        except KeyboardInterrupt:
            print("\nProgram terminated by user.")
            break
        except Exception as e:
            print(f"An error occurred: {str(e)}")

if __name__ == "__main__":
    main()