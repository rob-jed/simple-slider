window.addEventListener('DOMContentLoaded', () => {
    const imageGallery = document.querySelector('.image-gallery');
    new ImageGallery(imageGallery);
});

class ImageGallery {
    constructor(imageGalleryElement) {
        this.imageGallery = imageGalleryElement;

        // Wrapper for all thumbnails
        this.slider = this.imageGallery.querySelector('.thumbnails-list')
        // Single thumbnails
        this.slides = this.slider.querySelectorAll('.thumbnail');
        // Previous slide button
        this.prevSlide = this.imageGallery.querySelector('.prev-slide');
        // Next slide button
        this.nextSlide = this.imageGallery.querySelector('.next-slide');

        this.visibleSlides = 6;
        this.singleTransformValue = 100 / this.visibleSlides;
        this.currentTransformValue = 0;
        this.activeSlide = null;

        this.moveToPrevSlide = this.moveToPrevSlide.bind(this);
        this.moveToNextSlide = this.moveToNextSlide.bind(this);

        this.initImageGallery();
    }

    initImageGallery() {
        this.getActiveSlideIndex();
        this.calculateMinMaxTransforms();
        this.bindEvents();
    }

    getActiveSlideIndex() {
        for(let i = 0; i < this.slides.length; i++) {
            if (this.slides[i].classList.contains('active')) {
                this.activeSlide = i;

                break;
            }
        }
    }

    /**
     * Calculate minimum and maximum slider transform values.
     * We need them to prevent moving slider too far.
    */
    calculateMinMaxTransforms() {
        const numberOHiddenSlides = (this.slides.length - this.visibleSlides) / 2;
        
        this.minTransformValue = numberOHiddenSlides * this.singleTransformValue;
        this.maxTransformValue = -(numberOHiddenSlides * this.singleTransformValue);
    }

    bindEvents() {
        this.prevSlide.addEventListener('click', this.moveToPrevSlide);
        this.nextSlide.addEventListener('click', this.moveToNextSlide);
    }

    moveToPrevSlide() {
        if (this.nextSlide.disabled) {
            this.nextSlide.disabled = false;
        }

        const newTransformValue = this.currentTransformValue + this.singleTransformValue;

        // In case we reach first slide after current transition we have to disable previous button
        if (newTransformValue >= this.minTransformValue) {
            this.prevSlide.disabled = true;
        }

        this.currentTransformValue = newTransformValue;
        this.slider.style.transform = `translate3d(${newTransformValue}%, 0, 0)`;
    }

    moveToNextSlide() {
        if (this.prevSlide.disabled) {
            this.prevSlide.disabled = false;
        }

        const newTransformValue = this.currentTransformValue - this.singleTransformValue;

        // In case we reach last slide after current transition we have to disable next button
        if (newTransformValue <= this.maxTransformValue) {
            this.nextSlide.disabled = true;
        }

        this.currentTransformValue = newTransformValue;
        this.slider.style.transform = `translate3d(${newTransformValue}%, 0, 0)`;
    }
}
