$(document).ready(() => {
    let reviewsVisible = false;

    $('#showHideReviews').click(() => {
        if (reviewsVisible) {
	    $('#reviewsContainer').empty();
	    $('#showHideReviews').text('show');
	} else {
	    fetchReviews();
	    $('#showHideReviews').text('hide');
	}
	reviewsVisible = !reviewsVisible;
    });

    function fetchReviews() {
        const placeId = $('#placeId').val();
	$.ajax({
	    url: `http://0.0.0.0:5001/api/v1/places/${placeId}/reviews`,
	    type: 'GET',
	    contentType: 'application/json',
	    success: (reviews) => {
	        reviews.forEach((review) => {
	            const reviewElement = `
		        <article>
			    <div class="review_header">
			        <h3>${review.user.first_name} ${review.user.last_name}</h3>
			        <span>${new Date(review.created_at).toLocaleString()}</span>
			    </div>
			    <div class="review_text">${review.text}</div>
			</article>
		    `;
		    $('#reviewsContainer').append(reviewElement);
		});
	    },
	    error: (error) => {
	        console.error('Error fetching reviews:', error);
	    }
	});
    }
});
