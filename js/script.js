// ==========================================
// BANCO DE PERGUNTAS
// ==========================================

const perguntas = [

    {
        pergunta:
            "Os lados de um triângulo ABC medem 10 cm, 24 cm e 26 cm. É correto afirmar que esse triângulo é retângulo?",
        
        

        alternativas: [
            "Sim, pois 10² + 24² = 26²",
            "Não, pois 10 + 24 ≠ 26",
            "Sim, pois a soma dos dois lados menores é igual ao lado maior",
            "Não, pois 10² + 24² = 600, que é diferente de 26²",
            "Não é possível determinar sem saber os ângulos internos"
        ],

        correta: "Sim, pois 10² + 24² = 26²"
    },


    {
        pergunta:
            "Durante um incêndio num edifício de apartamentos, os bombeiros utilizaram uma escada Magirus de 10 metros para atingir a janela do apartamento em chamas. A escada estava colocada a 1 m do chão, sobre um caminhão que se encontrava afastado 6 m do edifício. Qual é a altura do apartamento em relação ao chão?",
        imagem: "../img/p2.png",

        alternativas: [
            "8 metros",
            "9 metros",
            "10 metros",
            "11 metros",
            "12 metros"
        ],

        correta: "9 metros"
    },


    {
        pergunta:
            "O esquema abaixo representa o projeto de uma escada de 5 degraus com mesma altura. De acordo com os dados da figura, qual é o comprimento de todo o corrimão, em metros?",
        imagem: "../img/p3.png",
        alternativas: [
            "2,10 m",
            "2,20 m",
            "2,40 m",
            "2,80 m",
            "3,60 m"
        ],

        correta: "2,10 m"
    },


    {
        pergunta:
            "A figura representa uma ilha em escala reduzida. Se o lado de cada quadradinho do mapa equivale a 1 km no tamanho real, qual é a distância, em linha reta, entre os pontos A e B?",
        imagem: "../img/p4.png",
        alternativas: [
            "√20 km",
            "√25 km",
            "√29 km",
            "√34 km",
            "7 km"
        ],

        correta: "√29 km"
    },


    {
        pergunta:
            "Qual deve ser a altitude do balão para que sua distância ao topo do prédio seja de 10 km?",
        imagem: "../img/p5.png",
        alternativas: [
            "6,0 km",
            "6,2 km",
            "7,0 km",
            "8,2 km",
            "18,2 km"
        ],

        correta: "6,2 km"
    },


    {
        pergunta:
            "Se um quadrado tem 225 cm² de área, qual é a medida da diagonal desse quadrado?",

        alternativas: [
            "5 cm",
            "5√2 cm",
            "15 cm",
            "15√2 cm",
            "30√2 cm"
        ],

        correta: "15√2 cm"
    },


    {
        pergunta:
            "Em um recente vendaval, um poste de luz de 9 metros de altura quebrou-se em um ponto a uma distância x do solo. A parte do poste acima da fratura inclinou-se e sua extremidade superior encostou no solo a uma distância de 3 m do mesmo. A que altura x do solo o poste quebrou?",
        imagem: "../img/p7.png",
        alternativas: [
            "3 metros",
            "4 metros",
            "4,5 metros",
            "5 metros",
            "6 metros"
        ],

        correta: "4 metros"
    },


    {
        pergunta:
            "Na casa ilustrada, a estrutura de madeira que sustenta o telhado apoia-se na laje. Devem-se dispor caibros (peças de madeira) na vertical, indo da laje ao ponto mais alto do telhado, como a peça BD da ilustração. Devido à presença da caixa d'água, essas peças são cortadas com dois metros de comprimento e postas à meia distância das extremidades A e C da laje. Assim, ABD é um triângulo retângulo de catetos quatro metros e dois metros. O comprimento da peça de madeira com extremidades em A e em B é, aproximadamente, de:",
        imagem: "../img/p8.png",
        alternativas: [
            "5 metros",
            "7,05 metros",
            "5,19 metros",
            "4,48 metros",
            "6,12 metros"
        ],

        correta: "4,48 metros"
    }

];

// ==========================================
// EMBARALHAR ARRAY
// ==========================================

function embaralhar(array) {

    for (let i = array.length - 1; i > 0; i--) {

        const j =
            Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] =
            [array[j], array[i]];

    }

    return array;
}



// ==========================================
// VARIÁVEIS DO JOGO
// ==========================================

let indice = 0;

let pontos = 100;

let acertos = 0;

let erros = 0;

let tempo = 15;

let intervalo = null;

let nomeJogador = "";

let avatarSelecionado = "😀";


// ==========================================
// SISTEMA DE SOM
// ==========================================

// Arquivos de áudio da pasta audio
const sons = {
    acerto: new Audio("../audio/acerto.mp3"),
    erro: new Audio("../audio/erro.mp3"),
    gameover: new Audio("../audio/gameover.mp3"),
    vitoria: new Audio("../audio/vitoria.mp3")
};


// Função para tocar os sons
function tocarSom(tipo) {

    const som = sons[tipo];

    if (!som) {
        console.log("Som não encontrado:", tipo);
        return;
    }

    // Reinicia o áudio caso ele já tenha sido tocado
    som.currentTime = 0;

    som.play().catch((erro) => {
        console.log("Erro ao reproduzir o som:", erro);
    });
}

// ==========================================
// ELEMENTOS DO HTML
// ==========================================

const inicio =
    document.getElementById("inicio");

const jogo =
    document.getElementById("jogo");

const fim =
    document.getElementById("fim");


const nomeInput =
    document.getElementById("txtNome");

const nomeTela =
    document.getElementById("nomeJogador");


const pontosTela =
    document.getElementById("pontos");

const perguntaTela =
    document.getElementById("pergunta");

const alternativasTela =
    document.getElementById("alternativas");


const progressoTela =
    document.getElementById("progresso");

const barraProgresso =
    document.getElementById("barraProgresso");


const tempoTela =
    document.getElementById("tempo");


const mensagemFinal =
    document.getElementById("mensagemFinal");

const estrelasTela =
    document.getElementById("estrelas");

const medalhaTela =
    document.getElementById("medalha");


const botaoIniciar =
    document.getElementById("btnIniciar");


// ==========================================
// ESCOLHER AVATAR
// ==========================================

const emojis =
    document.querySelectorAll(".emoji");


emojis.forEach((emoji) => {

    emoji.addEventListener(
        "click",
        () => {

            emojis.forEach((item) => {

                item.classList.remove(
                    "selecionado"
                );

            });


            emoji.classList.add(
                "selecionado"
            );


            avatarSelecionado =
                emoji.textContent;

        }
    );

});


// ==========================================
// BOTÃO INICIAR
// ==========================================

if (botaoIniciar) {

    botaoIniciar.addEventListener(
        "click",
        iniciarJogo
    );

}


// ==========================================
// INICIAR JOGO
// ==========================================

function iniciarJogo() {

    nomeJogador =
        nomeInput.value.trim();


    if (nomeJogador === "") {

        nomeJogador = "Jogador";

    }


    indice = 0;

    pontos = 100;

    acertos = 0;

    erros = 0;


    // ======================================
    // EMBARALHAR PERGUNTAS
    // ======================================

    embaralhar(perguntas);


    // ======================================
    // EMBARALHAR ALTERNATIVAS
    // ======================================

    perguntas.forEach(pergunta => {

        embaralhar(pergunta.alternativas);

    });


    pontosTela.textContent =
        pontos;


    nomeTela.textContent =
        `${avatarSelecionado} ${nomeJogador}`;


    inicio.classList.add(
        "oculto"
    );


    jogo.classList.remove(
        "oculto"
    );


    fim.classList.add(
        "oculto"
    );


    carregarPergunta();

}

// ==========================================
// CARREGAR PERGUNTA
// ==========================================

function carregarPergunta() {

    clearInterval(intervalo);

    removerFeedback();

    if (indice >= perguntas.length) {
        finalizarJogo();
        return;
    }

    const atual = perguntas[indice];

    // PERGUNTA
    perguntaTela.innerHTML = "";

    const texto = document.createElement("div");
    texto.textContent = atual.pergunta;

    perguntaTela.appendChild(texto);

    // IMAGEM, SE EXISTIR
    if (atual.imagem) {

        const imagem = document.createElement("img");

        imagem.src = atual.imagem;
        imagem.className = "imgs";
        imagem.alt = "Imagem da pergunta";

        perguntaTela.appendChild(imagem);
    }

    // PROGRESSO
    progressoTela.textContent =
        `Pergunta ${indice + 1} de ${perguntas.length}`;

    const porcentagem =
        ((indice + 1) / perguntas.length) * 100;

    barraProgresso.style.width =
        `${porcentagem}%`;

    // ALTERNATIVAS
    alternativasTela.innerHTML = "";

    atual.alternativas.forEach((alternativa) => {

        const botao = document.createElement("button");

        botao.classList.add("alternativa");

        botao.textContent = alternativa;

        botao.addEventListener("click", () => {

            verificarResposta(alternativa);

        });

        alternativasTela.appendChild(botao);

    });

    // INICIAR CRONÔMETRO
    iniciarTempo();
}

// ==========================================
// VERIFICAR RESPOSTA
// ==========================================

function verificarResposta(
    resposta
) {

    clearInterval(intervalo);


    const atual =
        perguntas[indice];


    const correta =
        atual.correta;


    const botoes =
        document.querySelectorAll(
            ".alternativa"
        );


    botoes.forEach((botao) => {

        botao.disabled = true;

    });


    // ======================================
    // RESPOSTA CORRETA
    // ======================================

    if (resposta === correta) {

        tocarSom("acerto");


        pontos += 100;

        acertos++;


        pontosTela.textContent =
            pontos;


        botoes.forEach((botao) => {

    if (botao.textContent === correta) {

        botao.classList.add("correct");

    }

});


        mostrarMensagem(
            "✅ Resposta correta! +100 pontos"
        );

    }


    // ======================================
    // RESPOSTA ERRADA
    // ======================================

    else {

        tocarSom("erro");


        pontos -= 50;

        erros++;


        if (pontos < 0) {

            pontos = 0;

        }


        pontosTela.textContent =
            pontos;


        botoes.forEach((botao) => {

    // Marca a resposta escolhida como errada
    if (botao.textContent === resposta) {

        botao.classList.add("wrong");

    }

    // Mostra a resposta correta
    if (botao.textContent === correta) {

        botao.classList.add("correct");

    }

});


mostrarMensagem(

    `❌ Você errou!<br>
    A resposta correta era:
    <strong>${correta}</strong><br>
    -50 pontos`

);

    }


    setTimeout(() => {

        if (pontos <= 0) {

            gameOver();

            return;

        }


        indice++;


        carregarPergunta();

    }, 2000);

}


// ==========================================
// CRONÔMETRO
// ==========================================

function iniciarTempo() {

    clearInterval(intervalo);


    tempo = 300;


    tempoTela.textContent =
        tempo;


    intervalo =
        setInterval(() => {

            tempo--;


            tempoTela.textContent =
                tempo;


            if (tempo <= 0) {

                clearInterval(
                    intervalo
                );


                tempoAcabou();

            }

        }, 1000);

}


// ==========================================
// TEMPO ACABOU
// ==========================================

function tempoAcabou() {

    tocarSom("tempo");


    pontos -= 50;

    erros++;


    if (pontos < 0) {

        pontos = 0;

    }


    pontosTela.textContent =
        pontos;


    const atual =
        perguntas[indice];


    const correta =
        atual.correta;


    const botoes =
        document.querySelectorAll(
            ".alternativa"
        );


    botoes.forEach((botao) => {

        botao.disabled = true;

    });


    if (botoes[correta]) {

        botoes[correta]
            .classList.add(
                "correct"
            );

    }


    const respostaCorreta =
        atual.alternativas[
            correta
        ];


    mostrarMensagem(

        `⏰ Tempo acabou!<br>
        A resposta correta era:
        <strong>${respostaCorreta}</strong><br>
        -50 pontos`

    );


    setTimeout(() => {

        if (pontos <= 0) {

            gameOver();

            return;

        }


        indice++;


        carregarPergunta();

    }, 2000);

}


// ==========================================
// MOSTRAR MENSAGEM
// ==========================================

function mostrarMensagem(texto) {

    let feedback =
        document.getElementById(
            "feedback"
        );


    if (!feedback) {

        feedback =
            document.createElement(
                "div"
            );


        feedback.id =
            "feedback";


        alternativasTela.after(
            feedback
        );

    }


    feedback.innerHTML =
        texto;

}


// ==========================================
// REMOVER MENSAGEM
// ==========================================

function removerFeedback() {

    const feedback =
        document.getElementById(
            "feedback"
        );


    if (feedback) {

        feedback.remove();

    }

}


// ==========================================
// GAME OVER
// ==========================================

function gameOver() {

    clearInterval(intervalo);


    tocarSom(
        "gameover"
    );


    jogo.classList.add(
        "oculto"
    );


    fim.classList.remove(
        "oculto"
    );


    mensagemFinal.innerHTML =

        `💀 ${nomeJogador},
        você ficou sem pontos!<br><br>
        Pontuação final: ${pontos}`;


    estrelasTela.textContent =
        "⭐";


    medalhaTela.textContent =
        "Continue praticando! 📚";

}


// ==========================================
// FINAL DO QUIZ
// ==========================================

function finalizarJogo() {

    clearInterval(intervalo);


    tocarSom(
        "vitoria"
    );


    jogo.classList.add(
        "oculto"
    );


    fim.classList.remove(
        "oculto"
    );


    let estrelas = "";

    let medalha = "";


    // ======================================
    // ESTRELAS
    // ======================================

    if (acertos === 8) {

        estrelas =
            "⭐⭐⭐⭐⭐";

    }

    else if (acertos >= 6) {

        estrelas =
            "⭐⭐⭐⭐";

    }

    else if (acertos >= 4) {

        estrelas =
            "⭐⭐⭐";

    }

    else if (acertos >= 2) {

        estrelas =
            "⭐⭐";

    }

    else {

        estrelas =
            "⭐";

    }


    // ======================================
    // MEDALHAS
    // ======================================

    if (acertos === 8) {

        medalha =
            "🥇 Medalha de Ouro!";

    }

    else if (acertos >= 6) {

        medalha =
            "🥈 Medalha de Prata!";

    }

    else if (acertos >= 4) {

        medalha =
            "🥉 Medalha de Bronze!";

    }

    else {

        medalha =
            "📚 Continue estudando!";

    }


    // ======================================
    // RESULTADO
    // ======================================

    mensagemFinal.innerHTML =

        `🎉 Parabéns,
        ${avatarSelecionado}
        ${nomeJogador}!<br><br>

        🏆 Pontuação: ${pontos}<br>

        ✅ Acertos: ${acertos}<br>

        ❌ Erros: ${erros}`;


    estrelasTela.textContent =
        estrelas;


    medalhaTela.textContent =
        medalha;

}


// ==========================================
// REINICIAR
// ==========================================

function reiniciar() {

    clearInterval(intervalo);


    fim.classList.add(
        "oculto"
    );


    jogo.classList.add(
        "oculto"
    );


    inicio.classList.remove(
        "oculto"
    );


    nomeInput.value =
        "";


    indice = 0;

    pontos = 100;

    acertos = 0;

    erros = 0;

    tempo = 15;


    pontosTela.textContent =
        pontos;


    tempoTela.textContent =
        tempo;


    progressoTela.textContent =
        `Pergunta 1 de ${perguntas.length}`;


    barraProgresso.style.width =
        "0%";


    perguntaTela.textContent =
        "";


    alternativasTela.innerHTML =
        "";


    removerFeedback();

}