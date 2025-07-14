<section class="tmg-banner">
    <div class="tmg-banner__inner">
        <div class="splide tmg-banner__splide">
            <div class="splide__track">
                <ul class="splide__list">
                    <?php
                        $banners = get_field('tmg_options_bnr', 'option');
                        if ($banners):
                        foreach ($banners as $banner):
                    ?>
                    <li class="splide__slide">
                        <a href="<?php echo esc_url($banner['bnr_url']); ?>"<?php if ($banner['bnr_blank']): ?> target="_blank"<?php endif; ?>>
                            <img src="<?php echo esc_url($banner['bnr_img']); ?>" alt="">
                        </a>
                    </li>
                    <?php
                        endforeach;
                        endif;
                    ?>
                </ul>
            </div>
            <div class="splide__arrows">
                <button class="splide__arrow splide__arrow--prev"></button>
                <button class="splide__arrow splide__arrow--next"></button>
            </div>
        </div>
    </div>
</section>