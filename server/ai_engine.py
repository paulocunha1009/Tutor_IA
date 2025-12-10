import sys
import json
import random

# Este script é chamado pelo Node.js
# Argumentos: sys.argv[1] = Matéria, sys.argv[2] = Horas

def generate_study_plan(subject, hours):
    # Lógica de "IA" simulada (aqui você colocaria OpenAI, Pandas, Scikit-learn, etc)
    
    topics = {
        "Matemática": ["Cálculo I", "Álgebra Linear", "Geometria Analítica"],
        "História": ["Idade Média", "Revolução Industrial", "Guerra Fria"],
        "Programação": ["Lógica", "Estrutura de Dados", "Algoritmos"]
    }
    
    selected_topics = topics.get(subject, ["Conceitos Básicos", "Prática", "Revisão"])
    
    plan = {
        "message": f"Plano de IA gerado para {subject}",
        "schedule": [],
        "ai_confidence": "98%"
    }
    
    for i in range(int(hours)):
        topic = selected_topics[i % len(selected_topics)]
        plan["schedule"].append({
            "hour": i + 1,
            "activity": f"Estudar {topic}",
            "method": random.choice(["Pomodoro", "Resumo", "Flashcards"])
        })
        
    return plan

if __name__ == "__main__":
    # Pega argumentos enviados pelo Node
    try:
        subject_arg = sys.argv[1]
        hours_arg = sys.argv[2]
        
        result = generate_study_plan(subject_arg, hours_arg)
        
        # Imprime JSON para o Node capturar
        print(json.dumps(result))
    except Exception as e:
        print(json.dumps({"error": str(e)}))