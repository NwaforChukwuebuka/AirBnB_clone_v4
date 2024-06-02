$(document).ready(() => {
    const selectedAmenities = {};

    $('input[type="checkbox"]').change(function() {
        if (this.checked) {
            selectedAmenities[$(this).data('id')] = $(this).data('name');
        } else {
            delete selectedAmenities[$(this).data('id')];
        }
        updateAmenities();
    });

    function updateAmenities() {
        const amenityNames = Object.values(selectedAmenities).join(', ');
        $('.amenities h4').text(amenityNames);
    }

    $.get('http://localhost:5001/api/v1/status/', (data) => {
        if (data.status === 'OK') {
            $('#api_status').addClass('available');
        } else {
            $('#api_status').removeClass('available');
        }
    });
});

