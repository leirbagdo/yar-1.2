const linguasindiginas = {
    guarani: {
        nome: "guarani",
        familia: "tupi",
        regiao: "sul/sudeste do brasil",
        frasesComuns: {
            "bom dia": "etê aram",
            "boa noite": "etê yamí",
            "boa tarde": "etê asaje",
            "como vai você": "mba'eichapa nde",
            "como você está": "mba'éichapa reime",
            "eu estou bem": "aiko porã",
            "eu sou mulher": "xe cunhã",
            "eu sou homem": "xe abá",
            "onde está o sol": "mo aram?",
            "onde fica a água": "mo i?",
            "olá amigo": "anauê abaré",
            "olá minha amiga": "anauê che amiga",
            "obrigado": "aguyjevete",
            "muito obrigado": "aguyjevete ndéve",
            "de nada": "mba'eve piko",
            "até logo": "ame'ẽ porã",
            "até amanhã": "ame'ẽ ko'êrô",
            "estou com fome": "xe oikotevê tembi'u",
            "estou com sede": "xe oikotevê y",
            "como se chama isso": "máva piko ko'ã",
            "qual é seu nome": "máva nde réra"
        },
        dicionario: {
            // Substantivos
            "abá": "homem", "cunhã": "mulher", "kurumí": "menino", "kunhãtã": "menina",
            "yawara": "cachorro", "jagua": "cão", "mbarakaja": "gato", "ka'a": "mato",
            "yvyra": "árvore", "yvytu": "vento", "ama": "chuva", "aratĩ": "céu",
            "y": "água", "í": "rio", "tata": "fogo", "tatapỹi": "fumaça",
            "oka": "casa", "óga": "lar", "táva": "aldeia", "yvy": "terra",
            "tembi'u": "comida", "hi'upã": "bebida", "pira": "peixe", "so'o": "carne",
            
            // Adjetivos
            "etê": "bom", "eté": "verdadeiro", "porã": "bonito", "pytã": "vermelho",
            "tinga": "branco", "hû": "preto", "una": "escuro", "sa'yju": "amarelo",
            "karê": "quente", "ro'y": "frio", "puku": "longo", "mbyky": "curto",
            
            // Verbos
            "aho": "eu vou", "reho": "você vai", "oho": "ele/ela vai",
            "jahu": "banhar", "karu": "comer", "py'u": "beber", "ke": "dormir",
            "ñe'ê": "falar", "hendu": "ouvir", "hecha": "ver", "japo": "fazer",
            
            // Pronomes e partículas
            "xe": "eu", "nde": "você", "ha'e": "ele/ela", "ore": "nós",
            "peê": "vocês", "ha'ekuéra": "eles/elas", "ko": "este", "pe": "esse",
            "piko": "? (interrogativo)", "nte": "não", "avei": "também"
        }
    }
};

class TradutorMultilinguas {
    constructor() {
        this.linguaAtiva = 'guarani';
    }
    
    mudarLingua(novaLingua) {
        if (linguasindiginas[novaLingua]) {
            this.linguaAtiva = novaLingua;
            this.atualizarInterface();
            return true;
        }
        return false;
    }

    atualizarInterface() {
        // Implementação futura
    }
}

// Sistema de tradução inteligente
function traduzirGuarani() {
    const entrada = document.getElementById("textoGuarani").value.toLowerCase().trim();
    const resultadoElement = document.getElementById("resultadoGuarani");
    
    // Limpar e resetar
    resultadoElement.innerHTML = "";
    resultadoElement.className = "resultado";
    
    if (!entrada) {
        mostrarResultado("Por favor, digite algo para traduzir", "erro");
        return;
    }

    // Normalizar texto (remover acentos, pontuação)
    const textoNormalizado = entrada
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/[.,!?;]/g, "");

    let traducao = [];
    let textoRestante = textoNormalizado;
    let palavrasNaoEncontradas = [];

    // 1. Buscar frases completas (maior para menor)
    for (let tamanho = 4; tamanho >= 1; tamanho--) {
        const palavras = textoRestante.split(/\s+/);
        
        for (let i = 0; i <= palavras.length - tamanho; i++) {
            const fraseTestada = palavras.slice(i, i + tamanho).join(' ');
            
            if (linguasindiginas.guarani.frasesComuns[fraseTestada]) {
                traducao.push(linguasindiginas.guarani.frasesComuns[fraseTestada]);
                // Substituir a frase encontrada por marcador
                palavras.splice(i, tamanho, "_TRADUZIDO_");
                textoRestante = palavras.join(' ').replace(/_TRADUZIDO_\s*/g, '').trim();
                i--; // Reajustar índice após remoção
                break;
            }
        }
    }

    // 2. Traduzir palavras individuais restantes
    if (textoRestante) {
        const palavrasRestantes = textoRestante.split(/\s+/).filter(p => p.length > 0);
        
        palavrasRestantes.forEach(palavra => {
            let traduzida = false;
            
            // Buscar no dicionário português → guarani
            const palavraGuarani = Object.keys(linguasindiginas.guarani.dicionario).find(
                key => linguasindiginas.guarani.dicionario[key] === palavra
            );
            
            if (palavraGuarani) {
                traducao.push(palavraGuarani);
                traduzida = true;
            } 
            // Buscar no dicionário guarani → português
            else if (linguasindiginas.guarani.dicionario[palavra]) {
                traducao.push(linguasindiginas.guarani.dicionario[palavra]);
                traduzida = true;
            }
            
            if (!traduzida) {
                palavrasNaoEncontradas.push(palavra);
                traducao.push(`<span class="palavra-desconhecida" title="Palavra não encontrada">${palavra}</span>`);
            }
        });
    }

    // 3. Exibir resultado
    if (traducao.length > 0) {
        const htmlResultado = traducao.join(' ');
        const classe = palavrasNaoEncontradas.length > 0 ? "aviso" : "sucesso";
        
        resultadoElement.innerHTML = htmlResultado;
        resultadoElement.className = `resultado ${classe}`;
        
        if (palavrasNaoEncontradas.length > 0) {
            resultadoElement.innerHTML += `
                <div class="sugestoes">
                    <strong>Palavras não encontradas:</strong> ${palavrasNaoEncontradas.join(', ')}
                </div>
            `;
        }
    } else {
        mostrarResultado("Nenhuma tradução encontrada. Tente outras palavras.", "erro");
    }
}

function mostrarResultado(mensagem, tipo) {
    const elemento = document.getElementById("resultadoGuarani");
    if (elemento) {
        elemento.innerHTML = mensagem;
        elemento.className = `resultado ${tipo}`;
    }
}

// Sugerir traduções ao digitar
function sugerirDuranteDigitação() {
    const input = document.getElementById("textoGuarani");
    const sugestoes = document.getElementById("sugestoes");
    
    if (!input || !sugestoes || !input.value.trim()) {
        if (sugestoes) sugestoes.style.display = 'none';
        return;
    }
    
    const termo = input.value.toLowerCase();
    const sugestoesEncontradas = [];
    
    // Buscar em frases comuns
    Object.keys(linguasindiginas.guarani.frasesComuns).forEach(frase => {
        if (frase.includes(termo) && sugestoesEncontradas.length < 5) {
            sugestoesEncontradas.push(frase);
        }
    });
    
    // Buscar no dicionário
    Object.keys(linguasindiginas.guarani.dicionario).forEach(palavra => {
        const traducao = linguasindiginas.guarani.dicionario[palavra];
        if ((traducao.includes(termo) || palavra.includes(termo)) && sugestoesEncontradas.length < 8) {
            sugestoesEncontradas.push(traducao);
        }
    });
    
    if (sugestoesEncontradas.length > 0) {
        sugestoes.innerHTML = sugestoesEncontradas.map(sug => 
            `<div class="sugestao" onclick="selecionarSugestao('${sug.replace(/'/g, "\\'")}')">${sug}</div>`
        ).join('');
        sugestoes.style.display = 'block';
    } else {
        sugestoes.style.display = 'none';
    }
}

function selecionarSugestao(sugestao) {
    const input = document.getElementById("textoGuarani");
    const sugestoes = document.getElementById("sugestoes");
    
    if (input) {
        input.value = sugestao;
    }
    if (sugestoes) {
        sugestoes.style.display = 'none';
    }
    traduzirGuarani();
}

function testarFuncao() {
    traduzirGuarani();
}

// Garantir que as funções estão disponíveis globalmente
window.traduzirGuarani = traduzirGuarani;
window.sugerirDuranteDigitação = sugerirDuranteDigitação;
window.selecionarSugestao = selecionarSugestao;
window.testarFuncao = testarFuncao;
window.mostrarResultado = mostrarResultado;

console.log("✅ guarani.js carregado com sucesso!");