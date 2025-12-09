document.addEventListener('DOMContentLoaded', function() {
    // Dados das regiões do Maranhão
    const regionData = {
        'norte-ma': {
            name: 'Região Norte do MA',
            peoples: ['Guajajara', 'Awá-Guajá', 'Tembé'],
            languages: ['Tupi-Guarani', 'Awá-Guajá'],
            description: 'Área de floresta amazônica com presença de povos Tupi-Guarani.',
            link: 'linguas/norte-ma.html'
        },
        'oeste-ma': {
            name: 'Região Oeste do MA',
            peoples: ['Awá-Guajá', 'Guajá'],
            languages: ['Awá-Guajá'],
            description: 'Fronteira com o Pará, área de preservação ambiental.',
            link: 'linguas/oeste-ma.html'
        },
        'centro-ma': {
            name: 'Região Centro do MA',
            peoples: ['Kanela', 'Krikati', 'Gavião', 'Apinajé'],
            languages: ['Timbira', 'Português'],
            description: 'Cerrado maranhense com diversidade de povos Jê.',
            link: 'linguas/centro-ma.html'
        },
        'leste-ma': {
            name: 'Região Leste do MA',
            peoples: ['Guajajara', 'Timbira', 'Urubu-Kaapor'],
            languages: ['Tupi-Guarani', 'Timbira'],
            description: 'Costa litorânea e transição para a Amazônia.',
            link: 'linguas/leste-ma.html'
        },
        'sul-ma': {
            name: 'Região Sul do MA',
            peoples: ['Krikati', 'Apinajé'],
            languages: ['Timbira'],
            description: 'Fronteira com Tocantins, área do cerrado.',
            link: 'linguas/sul-ma.html'
        }
    };

    // Elementos DOM
    const currentRegion = document.getElementById('current-region');
    const regionSubtitle = document.getElementById('region-subtitle');
    const panelContent = document.getElementById('panel-content');
    const statsPeoples = document.getElementById('stats-peoples');
    const statsLanguages = document.getElementById('stats-languages');
    const statsRegions = document.getElementById('stats-regions');

    // Controles do mapa
    const mapa = document.querySelector('.mapa-maranhao');
    let scale = 1;
    const zoomInBtn = document.getElementById('zoom-in');
    const zoomOutBtn = document.getElementById('zoom-out');
    const resetBtn = document.getElementById('reset-map');
    const fullscreenBtn = document.getElementById('fullscreen');

    // Eventos nas regiões do mapa
    document.querySelectorAll('.region-link').forEach(link => {
        const regionId = link.getAttribute('data-region');
        const path = link.querySelector('.region');
        
        // Hover effect
        link.addEventListener('mouseenter', function() {
            if (regionData[regionId]) {
                currentRegion.textContent = regionData[regionId].name;
                regionSubtitle.textContent = `${regionData[regionId].peoples.length} povos indígenas`;
                
                // Destaque visual
                path.style.strokeWidth = '4px';
                path.style.filter = 'brightness(1.3)';
            }
        });
        
        // Mouse leave
        link.addEventListener('mouseleave', function() {
            path.style.strokeWidth = '2px';
            path.style.filter = '';
        });
        
        // Click para redirecionar
        link.addEventListener('click', function(e) {
            e.preventDefault();
            if (regionData[regionId]) {
                // Animação de clique
                path.style.fillOpacity = '0.5';
                setTimeout(() => {
                    path.style.fillOpacity = '0.7';
                }, 200);
                
                // Redirecionar após breve delay
                setTimeout(() => {
                    window.location.href = regionData[regionId].link;
                }, 300);
            }
        });
    });

    // Eventos nos itens da legenda
    document.querySelectorAll('.legend-item').forEach(item => {
        item.addEventListener('click', function() {
            const regionId = this.getAttribute('data-region');
            if (regionData[regionId]) {
                // Simular clique no mapa
                const regionLink = document.querySelector(`[data-region="${regionId}"]`);
                if (regionLink) {
                    regionLink.click();
                }
            }
        });
    });

});