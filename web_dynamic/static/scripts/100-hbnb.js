$(document).ready(() => {
    const selectedAmenities = {};
    const selectedStates = {};
    const selectedCities = {};

    $('input[type="checkbox"]').change(function() {
        const dataId = $(this).data('id');
	const dataName = $(this).data('name');
		            
        if (this.checked) {
	    if ($(this).closest('ul').parent().find('h2').length) {
	        selectedStates[dataId] = dataName;
	    } else {
	        selectedCities[dataId] = dataName;
	    }
	    selectedAmenities[dataId] = dataName;
	} else {
	    if ($(this).closest('ul').parent().find('h2').length) {
	        delete selectedStates[dataId];
	    } else {
	        delete selectedCities[dataId];
	    }
	    delete selectedAmenities[dataId];
	}
	updateFilters();
    });

    function updateFilters() {
        const stateNames = Object.values(selectedStates).join(', ');
	const cityNames = Object.values(selectedCities).join(', ');
	const amenityNames = Object.values(selectedAmenities).join(', ');

	$('.locations h4').text(`${stateNames}, ${cityNames}`);
	$('.amenities h4').text(amenityNames);
    }

    $.get('http://localhost:5001/api/v1/status/', (data) => {
        if (data.status === 'OK') {
	    $('#api_status').addClass('available');
	} else {
	    $('#api_status').removeClass('available');
	}
    });

    function fetchPlaces(filters = {}) {
        $.ajax({
            url: 'http://localhost:5001/api/v1/places_search/',
	    type: 'POST',
	    contentType: 'application/json',
	    data: JSON.stringify(filters),
	    success: function(data) {
	        $('.places').empty();
		for (const place of data) {
		    const article = $('<article></article>');
		    const titleBox = $('<div class="title_box"></div>');
		    const title = $('<h2></h2>').text(place.name);
		    const price = $('<div class="price_by_night"></div>').text(`$${place.price_by_night}`);

		    titleBox.append(title);
		    titleBox.append(price);
		    article.append(titleBox);

		    const information = $('<div class="information"></div>');
		    const maxGuest = $('<div class="max_guest"></div>').text(`${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}`);
		    const numberRooms = $('<div class="number_rooms"></div>').text(`${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}`);
		    const numberBathrooms = $('<div class="number_bathrooms"></div>').text(`${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}`);

	            information.append(maxGuest);
		    information.append(numberRooms);
		    information.append(numberBathrooms);
		    article.append(information);

		    const description = $('<div class="description"></div>').html(place.description);
		    article.append(description);
                    
		    $('.places').append(article);
		}
	    },
	    error: function(error) {
	        console.error('Error fetching places:', error);
	    }
	});
    }

    fetchPlaces();
    
    $('button').click(() => {
        const filters = {
	    states: Object.keys(selectedStates),
	    cities: Object.keys(selectedCities),
	    amenities: Object.keys(selectedAmenities)
	};
	fetchPlaces(filters);
    });
});
