import pandas as pd
import random
import csv


######################################################################################### 

# Import BRAILLE_BASIC mapping if not already present
BRAILLE_BASIC = {
    'A': '⠁', 'B': '⠃', 'C': '⠉', 'D': '⠙', 'E': '⠑',
    'F': '⠋', 'G': '⠛', 'H': '⠓', 'I': '⠊', 'J': '⠚',
    'K': '⠅', 'L': '⠇', 'M': '⠍', 'N': '⠝', 'O': '⠕',
    'P': '⠏', 'Q': '⠟', 'R': '⠗', 'S': '⠎', 'T': '⠞',
    'U': '⠥', 'V': '⠧', 'W': '⠺', 'X': '⠭', 'Y': '⠽',
    'Z': '⠵', ' ': ' ',
    '1': '⠼⠁', '2': '⠼⠃', '3': '⠼⠉',
    '4': '⠼⠙', '5': '⠼⠑', '6': '⠼⠋', '7': '⠼⠛', '8': '⠼⠓',
    '9': '⠼⠊', '0': '⠼⠚'
}

def text_to_braille(text):
    """Convert text to Braille symbols"""
    return ''.join(BRAILLE_BASIC.get(char.upper(), char) for char in text)

# Updated words dictionary with Braille symbols
words = {
    "bad": text_to_braille("BAD"), 
    "close": text_to_braille("CLOSE"),
    "deaf": text_to_braille("DEAF"),
    "drink": text_to_braille("DRINK"),
    "eat": text_to_braille("EAT"),
    "go": text_to_braille("GO"),
    "good": text_to_braille("GOOD"),
    "hello": text_to_braille("HELLO"),
    "help": text_to_braille("HELP"),
    "hurt": text_to_braille("HURT"),
    "love": text_to_braille("LOVE"),
    "me": text_to_braille("ME"),
    "need": text_to_braille("NEED"),
    "no": text_to_braille("NO"),
    "open": text_to_braille("OPEN"),
    "play": text_to_braille("PLAY"),
    "please": text_to_braille("PLEASE"),
    "sorry": text_to_braille("SORRY"),
    "stop": text_to_braille("STOP"),
    "thank": text_to_braille("THANK"),
    "want": text_to_braille("WANT"),
    "we": text_to_braille("WE"),
    "when": text_to_braille("WHEN"),
    "who": text_to_braille("WHO"),
    "yes": text_to_braille("YES"),
    "you": text_to_braille("YOU"),
    "have": text_to_braille("HAVE"),
    "feel": text_to_braille("FEEL"),
    "think": text_to_braille("THINK"),
    "sleep": text_to_braille("SLEEP"),
    "goodbye": text_to_braille("GOODBYE")
}

#########################################################################################



# Define words for each stage from 11 to 20, adding exactly 3 words per stage
stage_words = {
    1: ["a", "b", "c","1"],
    2: ["d", "e", "f","2"],
    3: ["g", "h", "i","3"],
    4: ["j", "k", "l","4"],
    5: ["m", "n", "o","5"],
    6: ["p", "q", "r","6"],
    7: ["s", "t", "u","7"],
    8: ["v", "w", "x","8"],
    9: ["y", "z","0" ,"9"],
    10: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],


    11: ["me", "you", "we"],
    12: ["me", "you", "we", "hello", "goodbye", "please"],
    13: ["me", "you", "we", "hello", "goodbye", "please", "bad", "close", "deaf"],
    14: ["me", "you", "we", "hello", "goodbye", "please", "bad", "close", "deaf", "drink", "eat", "go"],
    15: ["me", "you", "we", "hello", "goodbye", "please", "bad", "close", "deaf", "drink", "eat", "go", "good", "hurt", "love"],
    16: ["me", "you", "we", "hello", "goodbye", "please", "bad", "close", "deaf", "drink", "eat", "go", "good", "hurt", "love", "need", "no", "open"],
    17: ["me", "you", "we", "hello", "goodbye", "please", "bad", "close", "deaf", "drink", "eat", "go", "good", "hurt", "love", "need", "no", "open", "play", "sorry", "stop"],
    18: ["me", "you", "we", "hello", "goodbye", "please", "bad", "close", "deaf", "drink", "eat", "go", "good", "hurt", "love", "need", "no", "open", "play", "sorry", "stop", "thank", "want", "when"],
    19: ["me", "you", "we", "hello", "goodbye", "please", "bad", "close", "deaf", "drink", "eat", "go", "good", "hurt", "love", "need", "no", "open", "play", "sorry", "stop", "thank", "want", "when", "have", "feel", "think"],
    20: ["me", "you", "we", "hello", "goodbye", "please", "bad", "close", "deaf", "drink", "eat", "go", "good", "hurt", "love", "need", "no", "open", "play", "sorry", "stop", "thank", "want", "when", "have", "feel", "think", "sleep", "who", "yes"]
}


































# Function to convert a word to Braille format
def word_to_braille(word):
    """Convert word to Braille format"""
    return text_to_braille(word.upper())

def generate_question(words, q_stage, current_id):
    """Generate Braille question with proper format"""
    correct_word = random.choice(list(words.keys()))
    correct_braille = word_to_braille(correct_word)

    # Get wrong options
    num_incorrect_words = min(3, len(words) - 1)
    incorrect_words = random.sample([w for w in words if w != correct_word], num_incorrect_words)

    # Pad if needed
    while len(incorrect_words) < 3:
        incorrect_words.append("N/A")

    # Shuffle answers
    options = incorrect_words + [correct_word]
    random.shuffle(options)
    
    # Find the index of correct answer
    correct_index = options.index(correct_word)
    answer_label = f"Q_A{correct_index + 1}"

    return {
        'Q_ID': str(current_id),
        'Q_text': f"What word does this Braille pattern represent: '{correct_braille}'?",
        'Q_Braille_Symbol': correct_braille,
        'Q_answer': answer_label,  # Changed to Q_A1, Q_A2, Q_A3, or Q_A4
        'Q_A1': options[0],
        'Q_A2': options[1],
        'Q_A3': options[2],
        'Q_A4': options[3],
        'Q_difficulty': '1',
        'Q_stage': q_stage
    }




def generate_stage1_10_questions():
    questions = []
    current_id = 1
    
    def generate_single_letter(stage_letters, stage, q_id):
        """Generate difficulty 1 question - single letter"""
        letter = random.choice(stage_letters)
        braille = text_to_braille(letter)
        wrong_letters = random.sample([l for l in stage_letters if l != letter], 
                                    min(3, len(stage_letters)-1))
        
        # Pad with random letters if needed
        while len(wrong_letters) < 3:
            extra = random.choice('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
            if extra not in wrong_letters and extra != letter:
                wrong_letters.append(extra)
                
        options = wrong_letters + [letter]
        random.shuffle(options)
        
        # Find the index of correct answer and map to Q_A format
        correct_index = options.index(letter)
        answer_label = f"Q_A{correct_index + 1}"
        
        return {
            'Q_ID': str(q_id),
            'Q_text': f"Which set of letters corresponds to these signs: {braille}?", 
            'Q_Braille_Symbol': braille,
            'Q_answer': answer_label,  # Now returns Q_A1, Q_A2, Q_A3 or Q_A4
            'Q_A1': options[0],
            'Q_A2': options[1],
            'Q_A3': options[2],
            'Q_A4': options[3],
            'Q_difficulty': '1',
            'Q_stage': stage
        }
    
    def generate_double_letter(stage_letters, stage, q_id):
        """Generate difficulty 2 question - two letter combination"""
        letters = ''.join(random.sample(stage_letters, min(2, len(stage_letters))))
        braille = text_to_braille(letters)
        wrong_combos = []
        
        # Generate 3 wrong combinations
        while len(wrong_combos) < 3:
            wrong = ''.join(random.sample(stage_letters, 2))
            if wrong != letters and wrong not in wrong_combos:
                wrong_combos.append(wrong)
                
        options = wrong_combos + [letters]
        random.shuffle(options)
        
        correct_index = options.index(letters)
        answer_label = f"Q_A{correct_index + 1}"
        
        return {
            'Q_ID': str(q_id),
            'Q_text': f"Which set of letters corresponds to these signs: {braille}?",
            'Q_Braille_Symbol': braille, 
            'Q_answer': answer_label,  # Now returns Q_A1, Q_A2, Q_A3 or Q_A4
            'Q_A1': options[0],
            'Q_A2': options[1],
            'Q_A3': options[2],
            'Q_A4': options[3],
            'Q_difficulty': '2',
            'Q_stage': stage
        }
    
    def generate_triple_letter(stage_letters, stage, q_id):
        """Generate difficulty 3 question - three letter combination"""
        letters = ''.join(random.sample(stage_letters, min(3, len(stage_letters))))
        braille = text_to_braille(letters)
        wrong_combos = []
        
        while len(wrong_combos) < 3:
            wrong = ''.join(random.sample(stage_letters, 3))
            if wrong != letters and wrong not in wrong_combos:
                wrong_combos.append(wrong)
                
        options = wrong_combos + [letters]
        random.shuffle(options)
        
        correct_index = options.index(letters)
        answer_label = f"Q_A{correct_index + 1}"
        
        return {
            'Q_ID': str(q_id),
            'Q_text': f"Which set of letters corresponds to these signs: {braille}?",
            'Q_Braille_Symbol': braille,
            'Q_answer': answer_label,  # Now returns Q_A1, Q_A2, Q_A3 or Q_A4
            'Q_A1': options[0], 
            'Q_A2': options[1],
            'Q_A3': options[2],
            'Q_A4': options[3],
            'Q_difficulty': '3',
            'Q_stage': stage
        }
    
    # Generate questions for each stage
    for stage in range(1, 11):
        stage_letters = stage_words[stage]
        
        # Generate 25 difficulty 1 questions
        for _ in range(25):
            questions.append(generate_single_letter(stage_letters, stage, current_id))
            current_id += 1
            
        # Generate 15 difficulty 2 questions
        for _ in range(15):
            questions.append(generate_double_letter(stage_letters, stage, current_id))
            current_id += 1
            
        # Generate 10 difficulty 3 questions
        for _ in range(10):
            questions.append(generate_triple_letter(stage_letters, stage, current_id))
            current_id += 1
    
    # Save to CSV
    with open('o.csv', 'w', newline='', encoding='utf-8-sig') as csvfile:
        fieldnames = ['Q_text', 'Q_Braille_Symbol', 'Q_answer', 'Q_A1', 'Q_A2', 'Q_A3', 'Q_A4', 
                     'Q_difficulty', 'Q_ID', 'Q_stage']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(questions)
    
    print(f"Generated {len(questions)} questions")
    return questions












# Generate questions for stages 11-20
questions = []
current_id = 501  # Start from 101 for stage 2

for stage in range(11, 21):
    words_in_stage = stage_words[stage]
    stage_word_dict = {word: word_to_braille(word) for word in words_in_stage}
    
    # Generate 10 questions per stage
    for _ in range(50):
        questions.append(generate_question(stage_word_dict, stage, current_id))
        current_id += 1

# Save to CSV with UTF-8-SIG encoding
fieldnames = ['Q_text', 'Q_Braille_Symbol', 'Q_answer', 'Q_A1', 'Q_A2', 'Q_A3', 'Q_A4', 
             'Q_difficulty', 'Q_ID', 'Q_stage']

with open('stage2_braille_questions.csv', 'w', newline='', encoding='utf-8-sig') as csvfile:
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(questions)

print("CSV file created: stage2_braille_questions.csv")







def generate_stage3_questions():
    """Generate Stage 3 questions (stages 21-30) using sentences"""
    questions = []
    current_id = 1001  # Start from 1001
    
    # Logical sentences provided
    sentences = [
    "I love you", "You need help", "We play well", "They drink water", "We want food",
    "I stop now", "Please open the drink", "They eat food", "We need water", "I hurt myself",
    "We go there", "I thank you", "You play badly", "They want love", "You eat now",
    "We love you", "They stop playing", "I need love", "They want help", "You drink water",
    "Who loves you?", "Who drinks water?", "What do you want?", "When do you play?",
    "Where are we going?", "Why stop now?", "Who needs help?", "Where is the food?",
    "Why do you love?", "When do we stop?", "Open the drink", "Stop playing now",
    "Please help me", "Close the door", "Drink the water", "Eat your food",
    "Love yourself more", "Thank me later", "Stop eating now", "Go there now",
    "Please love me", "Help yourself now", "Open the door", "Thank them now",
    "Stop loving them", "Close it now", "Drink this please", "Please go away",
    "Play with them", "Eat food now", "I thank them", "Please stop there",
    "They love food", "Who goes there?", "Why do we eat?", "Where do you play?",
    "Please play now", "Stop helping me", "What do we need?", "Open the food"
    ]
    
    # Split sentences into 10 groups for 10 stages
    sentences_per_stage = len(sentences) // 10
    sentence_groups = [sentences[i:i + sentences_per_stage] 
                      for i in range(0, len(sentences), sentences_per_stage)]
    
    for stage in range(21, 31):
        stage_sentences = sentence_groups[stage - 21]
        
        # Generate 50 questions per stage
        for _ in range(50):
            # Select random sentence
            correct_sentence = random.choice(stage_sentences)
            correct_braille = text_to_braille(correct_sentence)
            
            # Generate wrong options
            wrong_sentences = random.sample([s for s in stage_sentences 
                                          if s != correct_sentence], 3)
            
            # Create options and shuffle
            options = wrong_sentences + [correct_sentence]
            random.shuffle(options)
            
            # Find the index of correct answer
            correct_index = options.index(correct_sentence)
            answer_label = f"Q_A{correct_index + 1}"

            questions.append({
                'Q_ID': str(current_id),
                'Q_text': f"Which sentence corresponds to this Braille pattern: {correct_braille}?",
                'Q_Braille_Symbol': correct_braille, 
                'Q_answer': answer_label,
                'Q_A1': options[0],
                'Q_A2': options[1],
                'Q_A3': options[2],
                'Q_A4': options[3],
                'Q_difficulty': '1',
                'Q_stage': stage
            })
            current_id += 1
    
    # Save to CSV
    with open('stage3_braille_questions.csv', 'w', newline='', encoding='utf-8-sig') as csvfile:
        fieldnames = ['Q_text', 'Q_Braille_Symbol', 'Q_answer', 'Q_A1', 'Q_A2', 
                     'Q_A3', 'Q_A4', 'Q_difficulty', 'Q_ID', 'Q_stage']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(questions)
    
    return questions

# Run generation
if __name__ == "__main__":
 
  questions = generate_stage1_10_questions()
  questions = generate_stage3_questions()
  print(f"Generated {len(questions)} questions for Stages 21-30")
