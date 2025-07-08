<?php
/**
 * ヘッダー変更モジュール（トップページ以外）
 */

// トップページ以外の場合、デフォルトのヘッダーを除外
add_filter('snow_monkey_template_part_render', function( $html, $name, $vars ) {
    // トップページの場合は処理しない
    if (is_front_page()) {
        return $html;
    }
    
    // 除外するテンプレートパーツ
    $patterns = [
        'template-parts/content/entry/header/header',
        'template-parts/archive/entry/header/header'
    ];
    
    foreach ( $patterns as $pattern ) {
        if ( strpos( $name, $pattern ) !== false ) {
            return ''; // ヘッダーを除外
        }
    }
    
    return $html;
}, 10, 3);

// トップページ以外の場合、カスタムヘッダーを挿入
add_action('snow_monkey_prepend_contents', function () {
    // トップページの場合は処理しない
    if (is_front_page()) {
        return;
    }
    
    // カスタムヘッダーファイルを読み込み
    $heading_file = MY_SNOW_MONKEY_PATH . '/template/contents-heading.php';
    
    if (file_exists($heading_file)) {
        include $heading_file;
    } else {
        error_log('[My Snow Monkey] Contents heading file not found: ' . $heading_file);
    }
});