const frasesComuns = {
    "bom dia": "etê aram",
    "boa noite": "etê yamí",
    "como vai você": "mba'eichapa nde",
    "eu sou mulher": "xe cunhã",
    "eu sou homem": "xe abá",
    "onde está o sol": "mo aram?",
    "olá amigo": "anauê abaré",
    "obrigado": "aguyjevete",
    "até logo": "ame'ẽ porã",
    "estou com fome": "xe oikotevê tembi'u"
};

const dicionario = {
    "abá": "homem",
    "etê": "bom",
    "aram": "sol",
    "yamí": "noite",
    "anauê": "olá",
    "abaré": "amigo",
    "oca": "casa",
    "kurumí": "menino",
    "cunhã": "mulher",
    "yawara": "cachorro",
    "caá": "mato",
    "ira": "mel",
    "ibi": "terra",
    "i": "água",
    "tinga": "branco",
    "una": "preto",
    "aguyjevete": "obrigado",
    "ame'ẽ": "até",
    "porã": "logo",
    "xe": "eu",
    "oikotevê": "estou com",
    "tembi'u": "fome",
    "mba'eichapa": "como",
    "nde": "você",
    "mo": "onde"
};

function traduzir() {
    const entrada = document.getElementById("entrada").value.toLowerCase().trim();
    const saida = document.getElementById("saida");
    const erro = document.getElementById("erro");

    // Limpa mensagens anteriores
    saida.innerText = "";
    erro.innerText = "";

    if (!entrada) {
        erro.innerText = "Por favor, digite algo para traduzir";
        return;
    }

    // Estratégia MELHORADA: Divide a frase em palavras e traduz cada parte
    const palavras = entrada.split(/\s+/);
    let traducao = [];
    let naoTraduzidas = [];

    // Primeiro tenta encontrar combinações de frases comuns
    let i = 0;
    while (i < palavras.length) {
        let encontrouFrase = false;
        
        // Verifica combinações de 3, 2 e 1 palavra
        for (let tamanho = 3; tamanho >= 1; tamanho--) {
            if (i + tamanho <= palavras.length) {
                const fraseTestada = palavras.slice(i, i + tamanho).join(' ');
                
                if (frasesComuns[fraseTestada]) {
                    traducao.push(frasesComuns[fraseTestada]);
                    i += tamanho; // Pula as palavras já traduzidas
                    encontrouFrase = true;
                    break;
                }
            }
        }
        
        if (!encontrouFrase) {
            // Traduz palavra individual
            const palavra = palavras[i];
            if (dicionario[palavra]) {
                traducao.push(dicionario[palavra]);
            } else {
                // Tenta encontrar no dicionário reverso (português -> tupi)
                const palavraTupi = Object.keys(dicionario).find(
                    key => dicionario[key] === palavra
                );
                
                if (palavraTupi) {
                    traducao.push(palavraTupi);
                } else {
                    traducao.push(`[${palavra}]`);
                    naoTraduzidas.push(palavra);
                }
            }
            i++;
        }
    }

    saida.innerText = traducao.join(' ');
    
    if (naoTraduzidas.length > 0) {
        erro.innerText = "Palavras não traduzidas: " + naoTraduzidas.join(', ');
    } else {
        erro.innerText = "✓ Tradução completa";
    }
}

// Função para mostrar exemplos
function mostrarExemplos() {
    const exemplos = [
        "obrigado bom dia",
        "olá amigo como vai você",
        "eu sou homem",
        "casa homem mulher"
    ];
    
    const listaExemplos = document.getElementById('exemplos');
    if (listaExemplos) {
        listaExemplos.innerHTML = exemplos.map(ex => 
            `<li onclick="document.getElementById('entrada').value='${ex}'; traduzir()">${ex}</li>`
        ).join('');
    }
}

// Chama a função quando a página carregar
document.addEventListener('DOMContentLoaded', mostrarExemplos);