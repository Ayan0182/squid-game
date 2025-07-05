        // DOM Elements
        const loginBtn = document.getElementById('loginBtn');
        const mainContent = document.querySelector('.main-content');
        const createAvatarBtn = document.getElementById('createAvatar');
        const invitationSection = document.querySelector('.invitation-section');
        const gamesSection = document.querySelector('.games-section');
        const joinGameBtn = document.getElementById('joinGame');
        const navLinks = document.querySelectorAll('nav a');
        const playButtons = document.querySelectorAll('.play-btn');
        const gameScreens = document.querySelectorAll('.game-screen');
        
        // Player data
        let playerName = '';
        let playerNumber = '';
        
        // Login functionality
        loginBtn.addEventListener('click', function() {
            const username = document.getElementById('username').value;
            if (username) {
                playerName = username;
                document.querySelector('.login-container').style.display = 'none';
                mainContent.style.display = 'block';
            }
        });
        
        // Create avatar
        createAvatarBtn.addEventListener('click', function() {
            const nameInput = document.getElementById('player-name').value;
            const numberInput = document.getElementById('player-number').value;
            
            if (nameInput && numberInput) {
                playerName = nameInput;
                playerNumber = numberInput;
                
                // Update preview
                document.getElementById('preview-name').textContent = nameInput;
                document.getElementById('preview-number').textContent = '#' + numberInput;
                
                // Show invitation
                invitationSection.style.display = 'block';
                document.getElementById('invitation-name').textContent = `${nameInput} - #${numberInput}`;
            }
        });
        
        // Join game
        joinGameBtn.addEventListener('click', function() {
            gamesSection.style.display = 'block';
            invitationSection.style.display = 'none';
            document.querySelector('.avatar-section').style.display = 'none';
        });
        
        // Navigation
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Update active link
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // Show the correct section
                const page = this.getAttribute('data-page');
                if (page === 'home') {
                    document.querySelector('.avatar-section').style.display = 'block';
                    invitationSection.style.display = 'none';
                    gamesSection.style.display = 'none';
                } else if (page === 'rules') {
                    alert("Squid Game Rules:\n\n1. Players must compete in a series of children's games\n2. Failure to complete a game results in elimination\n3. Players are free to leave if the majority agrees\n4. Any attempt to stop the games will result in elimination\n5. The last surviving player wins the prize money");
                } else if (page === 'winner') {
                    alert("Season 1 Winner:\n\nPlayer 456 - Seong Gi-hun\n\nWon 45.6 billion won ($38.7 million USD)\n\nThe only survivor of the 2020 Squid Game");
                } else if (page === 'about') {
                    alert("About Squid Game:\n\nSquid Game is a South Korean survival drama television series. The series revolves around a contest where 456 players, all of whom are in deep financial debt, risk their lives to play a series of deadly children's games for the chance to win a ₩45.6 billion prize.");
                }
            });
        });
        
        // Game initialization
        playButtons.forEach(button => {
            button.addEventListener('click', function() {
                const game = this.getAttribute('data-game');
                showGameScreen(game);
            });
        });
        
        // Show game screen
        function showGameScreen(game) {
            // Hide all game screens
            gameScreens.forEach(screen => screen.style.display = 'none');
            
            // Show the selected game
            document.getElementById(`${game}Game`).style.display = 'block';
            
            // Initialize the game
            if (game === 'button') {
                initButtonGame();
            } else if (game === 'color') {
                initColorGame();
            } else if (game === 'door') {
                initDoorGame();
            } else if (game === 'pattern') {
                initPatternGame();
            } else if (game === 'stars') {
                initStarsGame();
            }
        }
        
        // Button Game
        function initButtonGame() {
            const buttons = document.querySelectorAll('#buttonGame .game-btn');
            const timer = document.getElementById('buttonTimer');
            let timeLeft = 5;
            
            // Reset buttons
            buttons.forEach(btn => {
                btn.classList.remove('safe', 'danger');
                btn.textContent = '?';
                btn.disabled = false;
            });
            
            // Set a random safe button
            const safeIndex = Math.floor(Math.random() * buttons.length);
            buttons[safeIndex].classList.add('safe');
            buttons[safeIndex].textContent = 'SAFE';
            
            // Set others as danger
            buttons.forEach((btn, index) => {
                if (index !== safeIndex) {
                    btn.classList.add('danger');
                    btn.textContent = 'ELIMINATE';
                }
            });
            
            // Timer
            const countdown = setInterval(() => {
                timeLeft--;
                timer.textContent = timeLeft;
                
                if (timeLeft <= 0) {
                    clearInterval(countdown);
                    showResult(false, "Time's up!");
                }
            }, 1000);
            
            // Button event listeners
            buttons.forEach(btn => {
                btn.addEventListener('click', function() {
                    clearInterval(countdown);
                    if (this.classList.contains('safe')) {
                        showResult(true, "You survived!");
                    } else {
                        showResult(false, "Wrong button!");
                    }
                });
            });
        }
        
        // Color Game
        function initColorGame() {
            const timer = document.getElementById('colorTimer');
            const colorBoxes = document.querySelectorAll('.color-box');
            let timeLeft = 3;
            let correctColor = '';
            
            // Reset boxes
            colorBoxes.forEach(box => {
                box.style.opacity = 1;
                box.onclick = null;
            });
            
            // Select a random correct color
            correctColor = ['red', 'blue', 'green', 'yellow'][Math.floor(Math.random() * 4)];
            
            // Timer
            const countdown = setInterval(() => {
                timeLeft--;
                timer.textContent = timeLeft;
                
                if (timeLeft <= 0) {
                    clearInterval(countdown);
                    // Hide colors
                    colorBoxes.forEach(box => box.style.opacity = 0);
                    
                    // Add click events
                    colorBoxes.forEach(box => {
                        box.onclick = function() {
                            if (this.getAttribute('data-color') === correctColor) {
                                showResult(true, "Correct color!");
                            } else {
                                showResult(false, "Wrong color!");
                            }
                        };
                    });
                }
            }, 1000);
        }
        
        // Door Game
        function initDoorGame() {
            const doors = document.querySelectorAll('.door');
            const chancesDisplay = document.getElementById('chances');
            let chances = 3;
            let safeDoor = Math.floor(Math.random() * 4) + 1;
            
            chancesDisplay.textContent = chances;
            
            // Reset doors
            doors.forEach(door => {
                door.textContent = '🚪 ' + door.getAttribute('data-door');
                door.onclick = null;
                door.style.backgroundColor = '';
            });
            
            // Add click events
            doors.forEach(door => {
                door.addEventListener('click', function() {
                    const doorNum = this.getAttribute('data-door');
                    
                    if (doorNum == safeDoor) {
                        showResult(true, "Safe door found!");
                    } else {
                        chances--;
                        chancesDisplay.textContent = chances;
                        this.textContent = '💀';
                        this.style.backgroundColor = '#e74c3c';
                        
                        if (chances <= 0) {
                            showResult(false, "No chances left!");
                        }
                    }
                });
            });
        }
        
        // Pattern Game
        function initPatternGame() {
            const patternDisplay = document.getElementById('patternDisplay');
            const patternInput = document.getElementById('patternInput');
            const timer = document.getElementById('patternTimer');
            let timeLeft = 30;
            let pattern = [];
            let playerPattern = [];
            
            // Reset containers
            patternDisplay.innerHTML = '';
            patternInput.innerHTML = '';
            
            // Generate pattern
            const colors = ['red', 'blue', 'green', 'yellow'];
            for (let i = 0; i < 5; i++) {
                const color = colors[Math.floor(Math.random() * colors.length)];
                pattern.push(color);
                
                const colorEl = document.createElement('div');
                colorEl.className = 'pattern-color';
                colorEl.style.backgroundColor = getColorValue(color);
                patternDisplay.appendChild(colorEl);
            }
            
            // Create input buttons
            colors.forEach(color => {
                const colorBtn = document.createElement('div');
                colorBtn.className = 'pattern-color';
                colorBtn.style.backgroundColor = getColorValue(color);
                colorBtn.setAttribute('data-color', color);
                colorBtn.addEventListener('click', function() {
                    playerPattern.push(color);
                    checkPattern();
                });
                patternInput.appendChild(colorBtn);
            });
            
            // Timer
            const countdown = setInterval(() => {
                timeLeft--;
                timer.textContent = timeLeft;
                
                if (timeLeft <= 0) {
                    clearInterval(countdown);
                    showResult(false, "Time's up!");
                }
            }, 1000);
            
            // Check pattern
            function checkPattern() {
                if (playerPattern.length === pattern.length) {
                    if (playerPattern.join() === pattern.join()) {
                        showResult(true, "Pattern correct!");
                    } else {
                        showResult(false, "Pattern incorrect!");
                    }
                }
            }
        }
        
        // Stars Game
        function initStarsGame() {
            const starsDisplay = document.getElementById('starsDisplay');
            const starCountInput = document.getElementById('starCount');
            const submitBtn = document.getElementById('submitCount');
            
            // Reset
            starsDisplay.innerHTML = '';
            starCountInput.value = '';
            
            // Generate random number of stars (5-15)
            const starCount = Math.floor(Math.random() * 11) + 5;
            
            // Create stars
            for (let i = 0; i < starCount; i++) {
                const star = document.createElement('div');
                star.className = 'star';
                star.innerHTML = '⭐';
                starsDisplay.appendChild(star);
            }
            
            // Show stars briefly
            setTimeout(() => {
                starsDisplay.innerHTML = '';
                
                // Submit handler
                submitBtn.addEventListener('click', function() {
                    const playerCount = parseInt(starCountInput.value);
                    if (playerCount === starCount) {
                        showResult(true, "Correct count!");
                    } else {
                        showResult(false, `Wrong! It was ${starCount} stars`);
                    }
                });
            }, 1500);
        }
        
        // Show result
        function showResult(success, message) {
            const resultScreen = document.getElementById('resultScreen');
            const resultIcon = resultScreen.querySelectorAll('.result-icon');
            const resultText = resultScreen.querySelectorAll('.result-text');
            const resultPoints = resultScreen.querySelector('.result-points');
            const continueBtn = document.getElementById('continueBtn');
            
            // Hide all game screens
            gameScreens.forEach(screen => screen.style.display = 'none');
            
            // Show result screen
            resultScreen.style.display = 'block';
            
            // Set result content
            if (success) {
                resultIcon[0].style.display = 'block';
                resultIcon[1].style.display = 'none';
                resultText[0].style.display = 'block';
                resultText[1].style.display = 'none';
                resultPoints.textContent = 'You earned 500 points';
            } else {
                resultIcon[0].style.display = 'none';
                resultIcon[1].style.display = 'block';
                resultText[0].style.display = 'none';
                resultText[1].style.display = 'block';
                resultPoints.textContent = message;
            }
            
            // Continue button
            continueBtn.onclick = function() {
                resultScreen.style.display = 'none';
                gamesSection.style.display = 'block';
            };
        }
        
        // Helper function to get color value
        function getColorValue(color) {
            switch(color) {
                case 'red': return 'var(--squid-red)';
                case 'blue': return 'var(--squid-blue)';
                case 'green': return 'var(--squid-green)';
                case 'yellow': return 'var(--squid-yellow)';
                default: return '#ccc';
            }
        }