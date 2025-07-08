<?php
/**
 * アイキャッチ画像の前にモジュールを差し込む
 * 固定ページのみで使用し、カスタムフィールドの条件に基づいてモジュールを読み込む
 */

function insert_eyecatch_module_before_content() {
    if (is_page()) {
        if (get_field('tmg_eyecatch_pc') && get_field('tmg_eyecatch_sp')) {
            ?>
            <section class="tmg-eyecatch">
                <div class="tmg-eyecatch__inner">
                    <picture>
                        <source srcset="<?php the_field('tmg_eyecatch_pc'); ?>" media="(min-width: 800px)">
                        <img src="<?php the_field('tmg_eyecatch_sp'); ?>" alt="">
                    </picture>
                </div>
            </section>
            <?php
        }
    }
}

// l-contents__containerの直前にモジュールを挿入
add_action('snow_monkey_prepend_contents', 'insert_eyecatch_module_before_content', 5);