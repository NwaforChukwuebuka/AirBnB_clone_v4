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
});
