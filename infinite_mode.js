// Adicionando o modo infinito ao script.js

// Expandir o gameData para incluir o modo infinito
gameData.infiniteMode = {
    active: false,
    streak: 0,
    lives: 3,
    highScore: 0,
    usedQuestionIds: [],
    allQuestions: []
};

// Banco de perguntas expandido para o modo infinito
const additionalQuestions = [
    {
        id: '11',
        text: 'Qual é o menor planeta do Sistema Solar?',
        options: ['Marte', 'Vênus', 'Mercúrio', 'Plutão'],
        correctAnswer: 'Mercúrio',
        category: 'Astronomia',
        difficulty: 'medium',
    },
    {
        id: '12',
        text: 'Qual é o símbolo químico do ouro?',
        options: ['Au', 'Ag', 'Fe', 'Or'],
        correctAnswer: 'Au',
        category: 'Química',
        difficulty: 'easy',
    },
    {
        id: '13',
        text: 'Quem pintou "A Noite Estrelada"?',
        options: ['Pablo Picasso', 'Claude Monet', 'Vincent van Gogh', 'Salvador Dalí'],
        correctAnswer: 'Vincent van Gogh',
        category: 'Arte',
        difficulty: 'medium',
    },
    {
        id: '14',
        text: 'Qual é a capital da Austrália?',
        options: ['Sydney', 'Melbourne', 'Canberra', 'Brisbane'],
        correctAnswer: 'Canberra',
        category: 'Geografia',
        difficulty: 'medium',
    },
    {
        id: '15',
        text: 'Qual é o osso mais longo do corpo humano?',
        options: ['Fêmur', 'Úmero', 'Tíbia', 'Fíbula'],
        correctAnswer: 'Fêmur',
        category: 'Biologia',
        difficulty: 'medium',
    },
    {
        id: '16',
        text: 'Qual é o maior mamífero terrestre?',
        options: ['Elefante africano', 'Rinoceronte branco', 'Hipopótamo', 'Girafa'],
        correctAnswer: 'Elefante africano',
        category: 'Zoologia',
        difficulty: 'easy',
    },
    {
        id: '17',
        text: 'Quem escreveu "Romeu e Julieta"?',
        options: ['Charles Dickens', 'William Shakespeare', 'Jane Austen', 'Miguel de Cervantes'],
        correctAnswer: 'William Shakespeare',
        category: 'Literatura',
        difficulty: 'easy',
    },
    {
        id: '18',
        text: 'Qual é a montanha mais alta do mundo?',
        options: ['Monte Everest', 'K2', 'Monte Kilimanjaro', 'Monte Aconcágua'],
        correctAnswer: 'Monte Everest',
        category: 'Geografia',
        difficulty: 'easy',
    },
    {
        id: '19',
        text: 'Qual é o maior órgão do corpo humano?',
        options: ['Coração', 'Fígado', 'Pele', 'Intestino'],
        correctAnswer: 'Pele',
        category: 'Biologia',
        difficulty: 'easy',
    },
    {
        id: '20',
        text: 'Qual é o elemento mais abundante na crosta terrestre?',
        options: ['Ferro', 'Silício', 'Oxigênio', 'Alumínio'],
        correctAnswer: 'Oxigênio',
        category: 'Geologia',
        difficulty: 'hard',
    },
    {
        id: '21',
        text: 'Qual é a velocidade da luz no vácuo?',
        options: ['300.000 km/s', '150.000 km/s', '200.000 km/s', '250.000 km/s'],
        correctAnswer: '300.000 km/s',
        category: 'Física',
        difficulty: 'medium',
    },
    {
        id: '22',
        text: 'Qual é o rio mais longo do mundo?',
        options: ['Nilo', 'Amazonas', 'Yangtzé', 'Mississippi'],
        correctAnswer: 'Nilo',
        category: 'Geografia',
        difficulty: 'medium',
    },
    {
        id: '23',
        text: 'Quem foi o primeiro homem a pisar na Lua?',
        options: ['Buzz Aldrin', 'Neil Armstrong', 'Yuri Gagarin', 'Alan Shepard'],
        correctAnswer: 'Neil Armstrong',
        category: 'História',
        difficulty: 'easy',
    },
    {
        id: '24',
        text: 'Qual é a capital do Japão?',
        options: ['Pequim', 'Seul', 'Tóquio', 'Bangkok'],
        correctAnswer: 'Tóquio',
        category: 'Geografia',
        difficulty: 'easy',
    },
    {
        id: '25',
        text: 'Qual é o maior deserto do mundo?',
        options: ['Saara', 'Antártida', 'Gobi', 'Kalahari'],
        correctAnswer: 'Antártida',
        category: 'Geografia',
        difficulty: 'hard',
    },
    {
        id: '26',
        text: 'Qual é o menor país do mundo em área?',
        options: ['Mônaco', 'Vaticano', 'San Marino', 'Liechtenstein'],
        correctAnswer: 'Vaticano',
        category: 'Geografia',
        difficulty: 'medium',
    },
    {
        id: '27',
        text: 'Qual é o metal mais precioso?',
        options: ['Ouro', 'Platina', 'Ródio', 'Paládio'],
        correctAnswer: 'Ródio',
        category: 'Química',
        difficulty: 'hard',
    },
    {
        id: '28',
        text: 'Qual é a maior glândula do corpo humano?',
        options: ['Pâncreas', 'Fígado', 'Tireoide', 'Hipófise'],
        correctAnswer: 'Fígado',
        category: 'Biologia',
        difficulty: 'medium',
    },
    {
        id: '29',
        text: 'Quem pintou a "Última Ceia"?',
        options: ['Michelangelo', 'Leonardo da Vinci', 'Rafael', 'Donatello'],
        correctAnswer: 'Leonardo da Vinci',
        category: 'Arte',
        difficulty: 'medium',
    },
    {
        id: '30',
        text: 'Qual é o planeta mais quente do Sistema Solar?',
        options: ['Mercúrio', 'Vênus', 'Marte', 'Júpiter'],
        correctAnswer: 'Vênus',
        category: 'Astronomia',
        difficulty: 'hard',
    }
];

// Função para inicializar o modo infinito
function initInfiniteMode() {
    // Combinar todas as perguntas disponíveis
    gameData.infiniteMode.allQuestions = [...gameData.questions, ...additionalQuestions];
    
    // Resetar o estado do modo infinito
    gameData.infiniteMode.active = true;
    gameData.infiniteMode.streak = 0;
    gameData.infiniteMode.lives = 3;
    gameData.infiniteMode.usedQuestionIds = [];
    
    // Resetar o estado do jogo
    gameData.currentQuestionIndex = 0;
    gameData.score = 0;
    gameData.usedHelps = [];
    
    // Carregar a primeira pergunta
    loadInfiniteQuestion();
    
    // Navegar para a tela de jogo
    navigateToScreen('game-screen');
    
    // Atualizar a interface para o modo infinito
    updateInfiniteModeUI();
}

// Função para carregar uma pergunta aleatória não utilizada
function loadInfiniteQuestion() {
    // Filtrar perguntas não utilizadas
    const unusedQuestions = gameData.infiniteMode.allQuestions.filter(
        q => !gameData.infiniteMode.usedQuestionIds.includes(q.id)
    );
    
    // Se todas as perguntas foram usadas, resetar
    if (unusedQuestions.length === 0) {
        gameData.infiniteMode.usedQuestionIds = [];
        loadInfiniteQuestion();
        return;
    }
    
    // Selecionar uma pergunta aleatória
    const randomIndex = Math.floor(Math.random() * unusedQuestions.length);
    const question = unusedQuestions[randomIndex];
    
    // Marcar como utilizada
    gameData.infiniteMode.usedQuestionIds.push(question.id);
    
    // Atualizar a pergunta atual
    gameData.currentQuestion = question;
    
    // Atualizar a interface
    updateInfiniteQuestionUI(question);
}

// Função para atualizar a interface com a pergunta atual
function updateInfiniteQuestionUI(question) {
    // Atualizar contador de perguntas e pontuação
    document.querySelector('.question-counter').textContent = `Sequência: ${gameData.infiniteMode.streak}`;
    document.querySelector('.score-display').textContent = `Vidas: ${gameData.infiniteMode.lives}`;
    
    // Atualizar categoria e dificuldade
    document.querySelector('.category').textContent = question.category;
    
    const difficultyText = question.difficulty === 'easy' ? 'Fácil' : 
                          question.difficulty === 'medium' ? 'Médio' : 'Difícil';
    document.querySelector('.difficulty').textContent = difficultyText;
    
    // Atualizar texto da pergunta
    document.querySelector('.question-text h2').textContent = question.text;
    
    // Limpar e adicionar opções
    const optionsContainer = document.querySelector('.options-container');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        // Se a ajuda de eliminar foi usada, esconder algumas opções incorretas
        if (gameData.usedHelps.includes('eliminate') && option !== question.correctAnswer) {
            // Eliminar 2 alternativas incorretas aleatoriamente
            const incorrectOptions = question.options.filter(o => o !== question.correctAnswer);
            incorrectOptions.sort(() => Math.random() - 0.5);
            if (incorrectOptions.indexOf(option) < 2) {
                return; // Pular esta opção
            }
        }
        
        const optionElement = document.createElement('div');
        optionElement.classList.add('option');
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => {
            selectInfiniteOption(option);
        });
        
        optionsContainer.appendChild(optionElement);
    });
    
    // Atualizar estado dos botões de ajuda
    updateHelpButtons();
}

// Função para selecionar uma opção no modo infinito
function selectInfiniteOption(selectedOption) {
    const isCorrect = selectedOption === gameData.currentQuestion.correctAnswer;
    
    // Destacar opção selecionada
    document.querySelectorAll('.option').forEach(option => {
        if (option.textContent === selectedOption) {
            option.classList.add(isCorrect ? 'correct' : 'incorrect');
        }
        if (option.textContent === gameData.currentQuestion.correctAnswer && !isCorrect) {
            option.classList.add('correct');
        }
    });
    
    // Atualizar pontuação e streak
    if (isCorrect) {
        gameData.infiniteMode.streak++;
        
        // Atualizar recorde se necessário
        if (gameData.infiniteMode.streak > gameData.infiniteMode.highScore) {
            gameData.infiniteMode.highScore = gameData.infiniteMode.streak;
        }
        
        // Calcular pontuação
        let pointsEarned = 0;
        switch (gameData.currentQuestion.difficulty) {
            case 'easy':
                pointsEarned = 100;
                break;
            case 'medium':
                pointsEarned = 200;
                break;
            case 'hard':
                pointsEarned = 300;
                break;
            default:
                pointsEarned = 100;
        }
        gameData.score += pointsEarned;
    } else {
        // Reduzir vidas em caso de erro
        gameData.infiniteMode.lives--;
        
        // Verificar se o jogo acabou
        if (gameData.infiniteMode.lives <= 0) {
            setTimeout(() => {
                endInfiniteGame();
            }, 1500);
            return;
        }
    }
    
    // Aguardar um pouco antes de carregar a próxima pergunta
    setTimeout(() => {
        loadInfiniteQuestion();
    }, 1500);
}

// Função para finalizar o modo infinito
function endInfiniteGame() {
    // Atualizar tela de resultado
    document.querySelector('.final-score').textContent = gameData.infiniteMode.streak;
    document.querySelector('.max-score').textContent = `Seu recorde: ${gameData.infiniteMode.highScore}`;
    
    // Determinar mensagem com base na pontuação
    let resultMessage;
    let resultColor;
    
    if (gameData.infiniteMode.streak >= 20) {
        resultMessage = 'Incrível!';
        resultColor = '#48BB78';
        createConfetti();
    } else if (gameData.infiniteMode.streak >= 15) {
        resultMessage = 'Excelente!';
        resultColor = '#48BB78';
        createConfetti();
    } else if (gameData.infiniteMode.streak >= 10) {
        resultMessage = 'Muito bom!';
        resultColor = '#3182CE';
    } else if (gameData.infiniteMode.streak >= 5) {
        resultMessage = 'Bom trabalho!';
        resultColor = '#ED8936';
    } else {
        resultMessage = 'Continue tentando!';
        resultColor = '#E53E3E';
    }
    
    document.querySelector('.result-message h2').textContent = resultMessage;
    document.querySelector('.result-message h2').style.color = resultColor;
    
    // Resetar o modo infinito
    gameData.infiniteMode.active = false;
    
    // Navegar para a tela de resultado
    navigateToScreen('result-screen');
}

// Função para atualizar a interface do modo infinito
function updateInfiniteModeUI() {
    // Atualizar o título da tela de jogo
    const gameHeader = document.querySelector('.game-header');
    const infiniteBadge = document.createElement('div');
    infiniteBadge.classList.add('infinite-badge');
    infiniteBadge.textContent = 'MODO INFINITO';
    
    // Verificar se o badge já existe
    if (!document.querySelector('.infinite-badge')) {
        gameHeader.prepend(infiniteBadge);
    }
}

// Modificar a função useHelp para o modo infinito
const originalUseHelp = useHelp;
useHelp = function(helpType) {
    if (gameData.infiniteMode.active) {
        // Verificar se a ajuda já foi usada
        if (gameData.usedHelps.includes(helpType)) {
            return;
        }
        
        gameData.usedHelps.push(helpType);
        
        switch (helpType) {
            case 'skip':
                // No modo infinito, pular não conta como erro
                loadInfiniteQuestion();
                break;
                
            case 'eliminate':
                // Recarregar a pergunta para eliminar opções
                updateInfiniteQuestionUI(gameData.currentQuestion);
                break;
                
            case 'hint':
                // Mostrar dica
                document.getElementById('hint-text').textContent = 
                    'Esta é uma dica para a pergunta atual. Em um jogo real, seria uma dica específica para ajudar o jogador.';
                toggleModal('hint-modal', true);
                break;
        }
        
        // Atualizar estado dos botões de ajuda
        updateHelpButtons();
    } else {
        // Usar a função original para outros modos
        originalUseHelp(helpType);
    }
};

// Adicionar o modo infinito à tela inicial
document.addEventListener('DOMContentLoaded', function() {
    const gameModes = document.querySelector('.game-modes');
    
    // Criar o card do modo infinito
    const infiniteModeCard = document.createElement('div');
    infiniteModeCard.classList.add('game-mode-card');
    infiniteModeCard.setAttribute('data-mode', 'infinite');
    
    infiniteModeCard.innerHTML = `
        <div class="mode-icon">
            <i class="icon">♾️</i>
        </div>
        <div class="mode-info">
            <h3>Modo Infinito</h3>
            <p>Responda a perguntas sem fim e veja até onde consegue chegar. Três vidas, uma sequência infinita!</p>
        </div>
        <div class="mode-arrow">›</div>
    `;
    
    // Adicionar evento de clique
    infiniteModeCard.addEventListener('click', () => {
        gameData.gameMode = 'infinite';
        initInfiniteMode();
    });
    
    // Adicionar à lista de modos
    gameModes.appendChild(infiniteModeCard);
    
    // Modificar o botão de jogar novamente na tela de resultados
    document.getElementById('play-again-button').addEventListener('click', () => {
        if (gameData.gameMode === 'infinite') {
            initInfiniteMode();
        } else {
            startGame();
        }
    });
});

// Adicionar estilos CSS para o modo infinito
const styleElement = document.createElement('style');
styleElement.textContent = `
    .infinite-badge {
        background-color: #6C63FF;
        color: white;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: bold;
        margin-bottom: 8px;
        display: inline-block;
    }
`;
document.head.appendChild(styleElement);
