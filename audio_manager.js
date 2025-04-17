// Gerenciador de áudio para o Quiz Master
// Este arquivo gerencia a música de fundo e os efeitos sonoros do jogo

// Configuração inicial do áudio
const audioManager = {
    backgroundMusic: document.getElementById('background-music'),
    correctSound: document.getElementById('correct-sound'),
    incorrectSound: document.getElementById('incorrect-sound'),
    clickSound: document.getElementById('click-sound'),
    isMusicEnabled: true,
    isSoundEffectsEnabled: true,
    volume: 0.7, // 70% do volume máximo
    
    // Inicializar o gerenciador de áudio
    init: function() {
        // Configurar volume inicial
        this.setVolume(this.volume);
        
        // Configurar event listeners para os controles de áudio
        document.getElementById('toggle-audio').addEventListener('click', () => {
            this.toggleMusic();
        });
        
        document.getElementById('music-toggle').addEventListener('change', (e) => {
            this.isMusicEnabled = e.target.checked;
            if (this.isMusicEnabled) {
                this.playBackgroundMusic();
            } else {
                this.pauseBackgroundMusic();
            }
            this.updateAudioIcon();
        });
        
        document.getElementById('sound-effects-toggle').addEventListener('change', (e) => {
            this.isSoundEffectsEnabled = e.target.checked;
        });
        
        document.getElementById('volume-slider').addEventListener('input', (e) => {
            const volumeValue = e.target.value / 100;
            this.setVolume(volumeValue);
        });
        
        // Iniciar música de fundo quando o jogo começar
        document.querySelectorAll('.game-mode-card').forEach(card => {
            card.addEventListener('click', () => {
                this.playBackgroundMusic();
            });
        });
        
        // Adicionar sons aos botões
        document.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', () => {
                this.playClickSound();
            });
        });
        
        // Modificar a função selectOption para tocar sons
        const originalSelectOption = window.selectOption;
        window.selectOption = (selectedOption) => {
            const question = gameData.questions[gameData.currentQuestionIndex];
            const isCorrect = selectedOption === question.correctAnswer;
            
            if (isCorrect) {
                this.playCorrectSound();
            } else {
                this.playIncorrectSound();
            }
            
            originalSelectOption(selectedOption);
        };
        
        // Modificar a função selectInfiniteOption para tocar sons
        if (window.selectInfiniteOption) {
            const originalSelectInfiniteOption = window.selectInfiniteOption;
            window.selectInfiniteOption = (selectedOption) => {
                const isCorrect = selectedOption === gameData.currentQuestion.correctAnswer;
                
                if (isCorrect) {
                    this.playCorrectSound();
                } else {
                    this.playIncorrectSound();
                }
                
                originalSelectInfiniteOption(selectedOption);
            };
        }
    },
    
    // Reproduzir música de fundo
    playBackgroundMusic: function() {
        if (this.isMusicEnabled) {
            this.backgroundMusic.play().catch(e => {
                console.log('Reprodução automática bloqueada pelo navegador. Interação do usuário necessária.');
            });
        }
    },
    
    // Pausar música de fundo
    pauseBackgroundMusic: function() {
        this.backgroundMusic.pause();
    },
    
    // Alternar música de fundo
    toggleMusic: function() {
        if (this.backgroundMusic.paused) {
            this.isMusicEnabled = true;
            document.getElementById('music-toggle').checked = true;
            this.playBackgroundMusic();
        } else {
            this.isMusicEnabled = false;
            document.getElementById('music-toggle').checked = false;
            this.pauseBackgroundMusic();
        }
        this.updateAudioIcon();
    },
    
    // Atualizar ícone de áudio
    updateAudioIcon: function() {
        const audioIcon = document.getElementById('audio-icon');
        if (this.isMusicEnabled) {
            audioIcon.textContent = '🔊';
        } else {
            audioIcon.textContent = '🔇';
        }
    },
    
    // Definir volume para todos os sons
    setVolume: function(value) {
        this.volume = value;
        this.backgroundMusic.volume = value;
        this.correctSound.volume = value;
        this.incorrectSound.volume = value;
        this.clickSound.volume = value;
        
        // Atualizar o slider de volume nas configurações
        document.getElementById('volume-slider').value = value * 100;
    },
    
    // Reproduzir som de resposta correta
    playCorrectSound: function() {
        if (this.isSoundEffectsEnabled) {
            this.correctSound.currentTime = 0;
            this.correctSound.play().catch(e => console.log('Erro ao reproduzir som:', e));
        }
    },
    
    // Reproduzir som de resposta incorreta
    playIncorrectSound: function() {
        if (this.isSoundEffectsEnabled) {
            this.incorrectSound.currentTime = 0;
            this.incorrectSound.play().catch(e => console.log('Erro ao reproduzir som:', e));
        }
    },
    
    // Reproduzir som de clique
    playClickSound: function() {
        if (this.isSoundEffectsEnabled) {
            this.clickSound.currentTime = 0;
            this.clickSound.play().catch(e => {});
        }
    }
};

// Inicializar o gerenciador de áudio quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    // Adicionar estilos CSS para os controles de áudio
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .audio-controls {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 100;
        }
        
        .audio-button {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.8);
            border: 1px solid #ddd;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
        }
        
        .audio-button:hover {
            background-color: rgba(255, 255, 255, 1);
        }
        
        .settings-options {
            margin-bottom: 20px;
        }
        
        .setting-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
        }
        
        /* Switch toggle */
        .switch {
            position: relative;
            display: inline-block;
            width: 50px;
            height: 24px;
        }
        
        .switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }
        
        .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            transition: .4s;
        }
        
        .slider:before {
            position: absolute;
            content: "";
            height: 16px;
            width: 16px;
            left: 4px;
            bottom: 4px;
            background-color: white;
            transition: .4s;
        }
        
        input:checked + .slider {
            background-color: var(--primary-color);
        }
        
        input:focus + .slider {
            box-shadow: 0 0 1px var(--primary-color);
        }
        
        input:checked + .slider:before {
            transform: translateX(26px);
        }
        
        .slider.round {
            border-radius: 24px;
        }
        
        .slider.round:before {
            border-radius: 50%;
        }
        
        /* Volume slider */
        input[type=range] {
            -webkit-appearance: none;
            width: 70%;
            height: 8px;
            border-radius: 5px;
            background: #d3d3d3;
            outline: none;
        }
        
        input[type=range]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: var(--primary-color);
            cursor: pointer;
        }
        
        input[type=range]::-moz-range-thumb {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: var(--primary-color);
            cursor: pointer;
        }
    `;
    document.head.appendChild(styleElement);
    
    // Inicializar o gerenciador de áudio
    setTimeout(() => {
        audioManager.init();
    }, 500);
});

// Função para carregar músicas sem direitos autorais
function loadRoyaltyFreeMusic() {
    // URLs para músicas sem direitos autorais
    const musicUrls = {
        background: 'https://freepd.com/music/Puzzle%20Game.mp3',
        correct: 'https://freesound.org/data/previews/320/320654_5260872-lq.mp3',
        incorrect: 'https://freesound.org/data/previews/362/362205_6629901-lq.mp3',
        click: 'https://freesound.org/data/previews/522/522588_10058132-lq.mp3'
    };
    
    // Função para baixar e configurar um arquivo de áudio
    function setupAudio(audioElement, url) {
        fetch(url)
            .then(response => response.blob())
            .then(blob => {
                const objectURL = URL.createObjectURL(blob);
                audioElement.src = objectURL;
            })
            .catch(error => {
                console.error('Erro ao carregar áudio:', error);
                // Fallback para URLs diretas em caso de erro
                audioElement.src = url;
            });
    }
    
    // Configurar cada elemento de áudio
    setupAudio(document.getElementById('background-music'), musicUrls.background);
    setupAudio(document.getElementById('correct-sound'), musicUrls.correct);
    setupAudio(document.getElementById('incorrect-sound'), musicUrls.incorrect);
    setupAudio(document.getElementById('click-sound'), musicUrls.click);
}

// Carregar músicas quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', loadRoyaltyFreeMusic);
