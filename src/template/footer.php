<?php

use Framework\Helper;

?>

<?php
    $banner_path=MY_SNOW_MONKEY_PATH . '/template/modules/tmg-banner.php' ;
    if (file_exists($banner_path)) {
        include $banner_path;
    }
?>

    <footer class="l-footer" role='footer'>

        <section class="l-footer__item">
            <div class="p-footer-about">
                <div class="p-footer-info">
                    <div class="p-footer-info__logo">
                        <a class="" href="<?php echo esc_url(home_url('')); ?>">
                            <img src="<?php echo do_shortcode('[customfield name="logo"]'); ?>" alt="<?php bloginfo('name'); ?>" class="c-logo">
                        </a>
                    </div>
                    <div class="p-footer-info__tel">
                        <a href="tel:<?php echo do_shortcode('[customfield name="tel"]'); ?>"><span><?php echo do_shortcode('[customfield name="tel"]'); ?></span></a>
                    </div>
                    <div class="p-footer-info__address">
                        <p>〒<?php echo do_shortcode('[customfield name="postcode"]'); ?> <?php echo do_shortcode('[customfield name="address"]'); ?></p>
                        <a href="<?php echo esc_url(home_url('/access/')); ?>">アクセス</a>
                    </div>
                </div>
                <div class="p-footer-nav">
                    <!-- 管理画面 > メニュー footer_nav_top -->
                    <?php wp_nav_menu(array(
                        'menu' => 'nav_footer_top',
                        'menu_class' => 'p-footer-nav__top',
                        'container' => '',
                    )); ?>
                    <!-- 管理画面 > メニュー footer_nav_bottom -->
                    <?php wp_nav_menu(array(
                        'menu' => 'nav_footer_bottom',
                        'menu_class' => 'p-footer-nav__bottom',
                        'container' => '',
                    )); ?>
                </div>
            </div>
        </section>

        <section class="l-footer__item">
            <div class="p-footer-copy">
                <p><?php echo do_shortcode('[customfield name="copyright"]'); ?></p>
            </div>
        </section>

    </footer>