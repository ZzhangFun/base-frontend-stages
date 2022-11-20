ymaps.ready(init);
function init(){
    const div = document.createElement('div');
    div.id = 'map';
    div.style.width = '100%';
    div.style.height = '100%';
    document.querySelector('.map').append(div);
    let map = new ymaps.Map("map", {
        center: [55.76, 37.64],
        zoom: 7
    });

    map.controls.remove('searchControl');

    map.geoObjects.add(new ymaps.Placemark([56.741114, 37.225566], {
        balloonContentHeader: 'Общага',
    }));
    map.geoObjects.add(new ymaps.Placemark([56.749905, 37.141429], {
        balloonContentHeader: 'Берлога',
    }));

    document.querySelector('.loader').remove();
}