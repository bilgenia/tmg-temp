<?php

use Framework\Helper;

?>

<header class="l-header-origin" role="header">
    <div class="l-header-origin__wrap">

        <?php $tag = is_front_page() ? 'h1' : 'div'; ?>
        <<?php echo $tag; ?> class="l-header-origin__logo">
            <a href="<?php echo esc_url(home_url('')); ?>">
                <img src="<?php echo do_shortcode('[customfield name="logo"]'); ?>" alt="<?php bloginfo('name'); ?>" class="c-logo">
            </a>
        </<?php echo $tag; ?>>

        <div class="l-header-origin__actions">
            <ul class="p-header-actions__list">
                <li class="p-header-actions__item">
                    <a href="tel:<?php echo do_shortcode('[customfield name="tel"]'); ?>"><?php echo do_shortcode('[customfield name="tel"]'); ?></a>
                </li>
                <li class="p-header-actions__item" data-name="subNav">
                    <button class="c-hamburger" aria-controls="navigation" aria-expanded="false" data-name="subNav-button">
                        <span class="c-hamburger__bar"></span>
                        <span class="c-hamburger__bar"></span>
                        <span class="c-hamburger__bar"></span>
                    </button>
                </li>
            </ul>
        </div>

        <nav class="l-header-origin__nav" id="drawer-nav" role="navigation" data-name="nav">
            <div class="p-nav">
                <?php wp_nav_menu(array(
                    'menu' => 'nav_global',
                    'menu_id' => 'nav_global',
                    'menu_class' => 'p-nav__list js-global-nav',
                    'container' => 'p-nav__wrap',
                )); ?>
            </div>

            <div class="p-nav-sub">
                <a class="tmg-tel" href="tel:<?php echo do_shortcode('[customfield name="tel"]'); ?>"><?php echo do_shortcode('[customfield name="tel"]'); ?></a>
                <?php wp_nav_menu(array(
                    'menu' => 'nav_sub',
                    'menu_class' => 'p-nav-sub__list',
                    'container' => false,
                )); ?>
            </div>
        </nav>

    </div>
</header>