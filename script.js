// Dados do jogo
const gameData = {
    currentScreen: 'splash-screen',
    gameMode: 'classic',
    currentQuestionIndex: 0,
    score: 0,
    usedHelps: [],
    questions: [
        {
            id: '1',
            text: 'Qual é a capital do Brasil?',
            options: ['Rio de Janeiro', 'São Paulo', 'Brasília', 'Salvador'],
            correctAnswer: 'Brasília',
            category: 'Geografia',
            difficulty: 'easy',
        },
        {
            id: '2',
            text: 'Quem escreveu "Dom Casmurro"?',
            options: ['José de Alencar', 'Machado de Assis', 'Carlos Drummond de Andrade', 'Clarice Lispector'],
            correctAnswer: 'Machado de Assis',
            category: 'Literatura',
            difficulty: 'medium',
        },
        {
            id: '3',
            text: 'Qual é o maior planeta do Sistema Solar?',
            options: ['Terra', 'Marte', 'Júpiter', 'Saturno'],
            correctAnswer: 'Júpiter',
            category: 'Astronomia',
            difficulty: 'easy',
        },
        {
            id: '4',
            text: 'Em que ano ocorreu a Independência do Brasil?',
            options: ['1808', '1822', '1889', '1500'],
            correctAnswer: '1822',
            category: 'História',
            difficulty: 'medium',
        },
        {
            id: '5',
            text: 'Qual é o elemento químico com símbolo "O"?',
            options: ['Ouro', 'Ósmio', 'Oxigênio', 'Óxido'],
            correctAnswer: 'Oxigênio',
            category: 'Ciências',
            difficulty: 'easy',
        },
        {
            id: '6',
            text: 'Qual é a fórmula química da água?',
            options: ['H2O', 'CO2', 'O2', 'NaCl'],
            correctAnswer: 'H2O',
            category: 'Ciências',
            difficulty: 'easy',
        },
        {
            id: '7',
            text: 'Quem pintou a "Mona Lisa"?',
            options: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Michelangelo'],
            correctAnswer: 'Leonardo da Vinci',
            category: 'Arte',
            difficulty: 'medium',
        },
        {
            id: '8',
            text: 'Qual é o maior oceano do mundo?',
            options: ['Atlântico', 'Índico', 'Pacífico', 'Ártico'],
            correctAnswer: 'Pacífico',
            category: 'Geografia',
            difficulty: 'medium',
        },
        {
            id: '9',
            text: 'Qual é o resultado de 9 × 8?',
            options: ['63', '72', '81', '64'],
            correctAnswer: '72',
            category: 'Matemática',
            difficulty: 'easy',
        },
        {
            id: '10',
            text: 'Qual é o país mais populoso do mundo?',
            options: ['Índia', 'Estados Unidos', 'Brasil', 'China'],
            correctAnswer: 'China',
            category: 'Geografia',
            difficulty: 'medium',
        }
    ],
    leaderboardData: {
        global: [
            {name: 'João Silva', score: 9850},
            {name: 'Maria Oliveira', score: 8720},
            {name: 'Pedro Santos', score: 7650},
            {name: 'Ana Costa', score: 6540},
            {name: 'Jogador Anônimo', score: 5430, isCurrentUser: true},
            {name: 'Carlos Souza', score: 4320},
            {name: 'Fernanda Lima', score: 3210},
            {name: 'Ricardo Alves', score: 2100},
            {name: 'Juliana Mendes', score: 1980},
            {name: 'Roberto Gomes', score: 1870},
        ],
        friends: [
            {name: 'Maria Oliveira', score: 8720},
            {name: 'Pedro Santos', score: 7650},
            {name: 'Jogador Anônimo', score: 5430, isCurrentUser: true},
            {name: 'Carlos Souza', score: 4320},
            {name: 'Fernanda Lima', score: 3210},
        ],
        weekly: [
            {name: 'Pedro Santos', score: 3200},
            {name: 'Maria Oliveira', score: 2800},
            {name: 'Carlos Souza', score: 2400},
            {name: 'Jogador Anônimo', score: 1900, isCurrentUser: true},
            {name: 'Ana Costa', score: 1700},
            {name: 'Fernanda Lima', score: 1500},
            {name: 'Ricardo Alves', score: 1300},
            {name: 'Juliana Mendes', score: 1100},
            {name: 'Roberto Gomes', score: 900},
            {name: 'João Silva', score: 700},
        ]
    }
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Iniciar com a tela de splash
    setTimeout(() => {
        navigateToScreen('home-screen');
    }, 2000);

    // Configurar event listeners
    setupEventListeners();
});

// Configurar todos os event listeners
function setupEventListeners() {
    // Navegação entre telas
    document.querySelectorAll('.back-button').forEach(button => {
        button.addEventListener('click', () => {
            const targetScreen = button.getAttribute('data-screen');
            navigateToScreen(targetScreen);
        });
    });

    // Botões de navegação na tela inicial
    document.querySelectorAll('.nav-button').forEach(button => {
        button.addEventListener('click', () => {
            const targetScreen = button.getAttribute('data-screen');
            if (targetScreen) {
                navigateToScreen(targetScreen);
            } else if (button.id === 'settings-button') {
                toggleModal('settings-modal', true);
            }
        });
    });

    // Seleção de modo de jogo
    document.querySelectorAll('.game-mode-card').forEach(card => {
        card.addEventListener('click', () => {
            gameData.gameMode = card.getAttribute('data-mode');
            startGame();
        });
    });

    // Botões na tela de resultado
    document.getElementById('play-again-button').addEventListener('click', () => {
        startGame();
    });

    document.getElementById('home-button').addEventListener('click', () => {
        navigateToScreen('home-screen');
    });

    document.getElementById('share-button').addEventListener('click', () => {
        alert('Compartilhamento será implementado na versão completa.');
    });

    // Tabs no ranking
    document.querySelectorAll('.tab-button').forEach(tab => {
        tab.addEventListener('click', () => {
            const tabType = tab.getAttribute('data-tab');
            
            // Atualizar tab ativa
            document.querySelectorAll('.tab-button').forEach(t => {
                t.classList.remove('active');
            });
            tab.classList.add('active');
            
            // Atualizar conteúdo do ranking
            updateLeaderboard(tabType);
        });
    });

    // Botões de ajuda
    document.getElementById('skip-help').addEventListener('click', () => {
        useHelp('skip');
    });

    document.getElementById('eliminate-help').addEventListener('click', () => {
        useHelp('eliminate');
    });

    document.getElementById('hint-help').addEventListener('click', () => {
        useHelp('hint');
    });

    // Fechar modais
    document.getElementById('close-hint').addEventListener('click', () => {
        toggleModal('hint-modal', false);
    });

    document.getElementById('close-settings').addEventListener('click', () => {
        toggleModal('settings-modal', false);
    });
}

// Navegar para uma tela específica
function navigateToScreen(screenId) {
    // Esconder todas as telas
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Mostrar a tela selecionada
    document.getElementById(screenId).classList.add('active');
    gameData.currentScreen = screenId;
    
    // Ações específicas para certas telas
    if (screenId === 'leaderboard-screen') {
        updateLeaderboard('global');
    }
}

// Iniciar um novo jogo
function startGame() {
    // Resetar estado do jogo
    gameData.currentQuestionIndex = 0;
    gameData.score = 0;
    gameData.usedHelps = [];
    
    // Embaralhar perguntas
    shuffleArray(gameData.questions);
    
    // Navegar para a tela de jogo
    navigateToScreen('game-screen');
    
    // Carregar primeira pergunta
    loadQuestion();
}

// Carregar pergunta atual
function loadQuestion() {
    const question = gameData.questions[gameData.currentQuestionIndex];
    
    // Atualizar progresso
    const progressPercentage = ((gameData.currentQuestionIndex + 1) / gameData.questions.length) * 100;
    document.querySelector('.progress-bar').style.width = `${progressPercentage}%`;
    
    // Atualizar contador de perguntas e pontuação
    document.querySelector('.question-counter').textContent = `Pergunta ${gameData.currentQuestionIndex + 1}/${gameData.questions.length}`;
    document.querySelector('.score-display').textContent = `Pontos: ${gameData.score}`;
    
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
            selectOption(option);
        });
        
        optionsContainer.appendChild(optionElement);
    });
    
    // Atualizar estado dos botões de ajuda
    updateHelpButtons();
}

// Selecionar uma opção de resposta
function selectOption(selectedOption) {
    const question = gameData.questions[gameData.currentQuestionIndex];
    const isCorrect = selectedOption === question.correctAnswer;
    
    // Destacar opção selecionada
    document.querySelectorAll('.option').forEach(option => {
        if (option.textContent === selectedOption) {
            option.classList.add(isCorrect ? 'correct' : 'incorrect');
        }
        if (option.textContent === question.correctAnswer && !isCorrect) {
            option.classList.add('correct');
        }
    });
    
    // Calcular pontuação
    if (isCorrect) {
        let pointsEarned = 0;
        switch (question.difficulty) {
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
    }
    
    // Aguardar um pouco antes de avançar
    setTimeout(() => {
        gameData.currentQuestionIndex++;
        
        // Verificar se o jogo acabou
        if (gameData.currentQuestionIndex >= gameData.questions.length) {
            endGame();
        } else {
            loadQuestion();
        }
    }, 1500);
}

// Finalizar o jogo
function endGame() {
    // Atualizar tela de resultado
    document.querySelector('.final-score').textContent = gameData.score;
    document.querySelector('.max-score').textContent = `de ${gameData.questions.length * 100} pontos possíveis`;
    
    // Determinar mensagem com base na pontuação
    const percentCorrect = (gameData.score / (gameData.questions.length * 100)) * 100;
    let resultMessage;
    let resultColor;
    
    if (percentCorrect >= 80) {
        resultMessage = 'Excelente!';
        resultColor = '#48BB78';
        createConfetti();
    } else if (percentCorrect >= 60) {
        resultMessage = 'Muito bom!';
        resultColor = '#3182CE';
    } else if (percentCorrect >= 40) {
        resultMessage = 'Bom trabalho!';
        resultColor = '#ED8936';
    } else {
        resultMessage = 'Continue tentando!';
        resultColor = '#E53E3E';
    }
    
    document.querySelector('.result-message h2').textContent = resultMessage;
    document.querySelector('.result-message h2').style.color = resultColor;
    
    // Navegar para a tela de resultado
    navigateToScreen('result-screen');
}

// Usar uma ajuda
function useHelp(helpType) {
    // Verificar se a ajuda já foi usada
    if (gameData.usedHelps.includes(helpType)) {
        return;
    }
    
    gameData.usedHelps.push(helpType);
    
    switch (helpType) {
        case 'skip':
            // Pular para a próxima pergunta
            gameData.currentQuestionIndex++;
            
            // Verificar se o jogo acabou
            if (gameData.currentQuestionIndex >= gameData.questions.length) {
                endGame();
            } else {
                loadQuestion();
            }
            break;
            
        case 'eliminate':
            // Recarregar a pergunta para eliminar opções
            loadQuestion();
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
}

// Atualizar estado dos botões de ajuda
function updateHelpButtons() {
    const skipButton = document.getElementById('skip-help');
    const eliminateButton = document.getElementById('eliminate-help');
    const hintButton = document.getElementById('hint-help');
    
    skipButton.classList.toggle('disabled', gameData.usedHelps.includes('skip'));
    eliminateButton.classList.toggle('disabled', gameData.usedHelps.includes('eliminate'));
    hintButton.classList.toggle('disabled', gameData.usedHelps.includes('hint'));
}

// Atualizar ranking
function updateLeaderboard(type) {
    const leaderboardList = document.querySelector('.leaderboard-list');
    leaderboardList.innerHTML = '';
    
    gameData.leaderboardData[type].forEach((item, index) => {
        const rank = index + 1;
        
        const leaderboardItem = document.createElement('div');
        leaderboardItem.classList.add('leaderboard-item');
        if (item.isCurrentUser) {
            leaderboardItem.classList.add('current-user');
        }
        
        const rankElement = document.createElement('div');
        rankElement.classList.add('rank');
        if (rank === 1) rankElement.classList.add('gold');
        if (rank === 2) rankElement.classList.add('silver');
        if (rank === 3) rankElement.classList.add('bronze');
        rankElement.textContent = rank;
        
        const nameElement = document.createElement('div');
        nameElement.classList.add('player-name');
        nameElement.textContent = item.name;
        
        const scoreElement = document.createElement('div');
        scoreElement.classList.add('player-score');
        scoreElement.textContent = item.score;
        
        leaderboardItem.appendChild(rankElement);
        leaderboardItem.appendChild(nameElement);
        leaderboardItem.appendChild(scoreElement);
        
        leaderboardList.appendChild(leaderboardItem);
    });
}

// Mostrar/esconder modal
function toggleModal(modalId, show) {
    const modal = document.getElementById(modalId);
    if (show) {
        modal.classList.add('active');
    } else {
        modal.classList.remove('active');
    }
}

// Criar efeito de confete
function createConfetti() {
    const confettiCount = 100;
    const container = document.getElementById('result-screen');
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        // Posição aleatória
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.top = `-10px`;
        
        // Cor aleatória
        const colors = ['#FFD700', '#6C63FF', '#48BB78', '#3182CE', '#ED8936', '#E53E3E'];
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Tamanho aleatório
        const size = Math.random() * 10 + 5;
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        
        // Animação
        confetti.style.opacity = '1';
        confetti.style.transform = `translateY(0)`;
        confetti.style.transition = `transform ${Math.random() * 3 + 2}s ease-out, opacity ${Math.random() * 3 + 2}s ease-out`;
        
        container.appendChild(confetti);
        
        // Iniciar animação após um pequeno delay
        setTimeout(() => {
            confetti.style.transform = `translateY(${Math.random() * 500 + 200}px) rotate(${Math.random() * 360}deg)`;
            confetti.style.opacity = '0';
        }, 100);
        
        // Remover após a animação
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// Função auxiliar para embaralhar array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
