const QS = (e) =>  {
    return document.querySelector(e)
}

let seuVotoPara = QS('.d-1-1 span');
let cargo = QS('.d-1-2 span');
let descricao = QS('.d-1-4').innerHTML = '';
let warned = QS('.d-2');
let lateral = QS('.d-1--right');
let numeros = QS('.d-1-3');

let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let votos = [];

function getEtapa() {
    let etapa = etapas[etapaAtual];
    numero = '';
    votoBranco = false;

    let numeroHtml = '';

    for(let i=0; i < etapa.numeros; i++) {
        if(i === 0) {
            numeroHtml += '<div class="space focus"></div>'
        } else {
            numeroHtml += '<div class="space"></div>'
        }
    }

    seuVotoPara.style.display = 'none'
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    warned.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}

function updateInterface() {
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item) => {
        if(item.numero === numero) {
            return true
        } else {
            return false
        }
    });

    if(candidato.length > 0) {
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        warned.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`;        let fotosHtml = '';
        // let fotosHtml = '';
        for(let i in candidato.fotos) {
            if(candidato.fotos[i].url.small) {
                fotosHtml += `<div class="d-1-right-img small"><img src="/urna/images/${candidato.fotos[i].url}">${candidato.fotos[i].legenda}</div>`
            } else {
                fotosHtml += `<div class="d-1-right-img"><img src="/urna/images/${candidato.fotos[i].url}">${candidato.fotos[i].legenda}</div>`
            }
        }

        lateral.innerHTML = fotosHtml;
    } else {
        seuVotoPara.style.display = 'block';
        warned.style.display = 'block';
        descricao.innerHTML =  '<div class="warned-large focus">VOTO NULO</div>';
    }
}

function clicou(n) {
    let elNumero = QS('.space.focus');
    if(elNumero !== null) {
        elNumero.innerHTML = n;
        numero = `${numero}${n}`;

        elNumero.classList.remove('focus');
        
        if(elNumero.nextElementSibling !== null) {

            elNumero.nextElementSibling.classList.add('focus')
        } else {
            updateInterface()
        }

    }
}

function branco() {
    numero = '';
    votoBranco = true

    seuVotoPara.style.display = 'block';
    warned.style.display = 'block';
    lateral.innerHTML = '';
    numeros.innerHTML = '';
    descricao.innerHTML = '<div class="warned-large focus">VOTO EM BRANCO</div>';
}

function corrige() {
    getEtapa()
}

function confirma() {
    let etapa = etapas[etapaAtual];

    votos.push({
        etapa: etapas[etapaAtual].titulo,
        voto: 'branco'
    })

    if(votoBranco === true) {
        votoConfirmado = true

        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        })

    } else if (numero.length === etapa.numeros) {
        votoConfirmado = true;
        console.log('confirmando como '+numero)
    }

    if(votoConfirmado) {
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined) {
            getEtapa()
        } else {
            QS('.screen').innerHTML = '<div class="warned-huge focus">FIM</div>'
            console.log(votos)
        }
    }
} 

getEtapa()



