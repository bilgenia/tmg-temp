<?php

/**
 * Plugin name: My Snow Monkey
 * Description: このプラグインに、あなたの Snow Monkey 用カスタマイズコードを書いてください。
 * Version: 0.2.1
 *
 * @package my-snow-monkey
 * @author inc2734
 * @license GPL-2.0+
 */

/**
 * Snow Monkey 以外のテーマを利用している場合は有効化してもカスタマイズが反映されないようにする
 */
$theme = wp_get_theme(get_template());
if ('snow-monkey' !== $theme->template && 'snow-monkey/resources' !== $theme->template) {
    return;
}

/**
 * Directory url of this plugin
 *
 * @var string
 */
define('MY_SNOW_MONKEY_URL', untrailingslashit(plugin_dir_url(__FILE__)));

/**
 * Directory path of this plugin
 *
 * @var string
 */
define('MY_SNOW_MONKEY_PATH', untrailingslashit(plugin_dir_path(__FILE__)));

// Snow Monkeyテーマのフレームワークを読み込む
require_once get_template_directory() . '/vendor/autoload.php';

// WP_ENV定数のデフォルト値を設定
if (!defined('WP_ENV')) {
    define('WP_ENV', 'production');
}

// ==============================================================================================================
//
// CSS & JavaScript 読み込み
//
// ==============================================================================================================

// wp-envではsrcを読むように分岐
function enqueue_assets() {
    if(defined('WP_ENV') && WP_ENV === 'development') {
        wp_enqueue_script('vite-client', 'http://localhost:5173/@vite/client', array(), null, true);
        wp_enqueue_script('vite-script', 'http://localhost:5173/js/app.js', array(), null, true);
        wp_enqueue_style('vite-style', 'http://localhost:5173/sass/style.scss', array(), null, 'all');
    } else {
        wp_enqueue_script('custom-script', MY_SNOW_MONKEY_URL . '/js/app.js', array(), null, true);
        wp_enqueue_style('custom-script-style', MY_SNOW_MONKEY_URL . '/css/app.css', [ Framework\Helper::get_main_style_handle() ], filemtime( plugin_dir_path( __FILE__ )));
        wp_enqueue_style('custom-style', MY_SNOW_MONKEY_URL . '/css/style.css', [ Framework\Helper::get_main_style_handle() ], filemtime( plugin_dir_path( __FILE__ )));
    }
}
add_action('wp_enqueue_scripts', 'enqueue_assets', 99, 1);

// viteのときはmoduleへ変更
function add_type_module_to_vite_scripts($tag, $handle, $src) {
    if (in_array($handle, ['vite-client', 'vite-main', 'vite-script'])) {
        $tag = '<script type="module" src="' . esc_url($src) . '"></script>';
    }
    return $tag;
}
add_filter('script_loader_tag', 'add_type_module_to_vite_scripts', 10, 3);


// ==============================================================================================================
//
// 管理画面カスタマイズ
//
// ==============================================================================================================

// 管理画面のエディターへCSS適用
function admin_enqueue_assets() {
    if(defined('WP_ENV') && WP_ENV === 'development') {
        wp_enqueue_style('vite-style', 'http://localhost:5173/sass/editor-style.scss', array(), null, 'all');
    } else {
        wp_enqueue_style('my-custom-style', MY_SNOW_MONKEY_URL . '/css/editor-style.css', [ Framework\Helper::get_main_style_handle() ], filemtime( plugin_dir_path( __FILE__ )));
    }
}
add_action('admin_enqueue_scripts', 'admin_enqueue_assets', 99, 1);


// ==============================================================================================================
//
// tmg_options
//
// ==============================================================================================================

// オプション >　基本設定のフィールドを取得
// 取得したフィールド情報を出力するショートコード
// ショートコードを登録
// これらの関数は shortcode.php に移動しました


// ==============================================================================================================
//
// セキュリティ対策
//
// ==============================================================================================================

// authorページの無効化
add_filter('author_rewrite_rules', '__return_empty_array');
function disable_author_archive(){
    if(isset($_GET['author']) || preg_match('#/author/.+#', $_SERVER['REQUEST_URI'])){
        wp_redirect(home_url('/404.php'));
        exit;
    }
}
add_action('init', 'disable_author_archive');


// ==============================================================================================================
//
// テーマカラーフック(safariのノッチ部分対策)
//
// ==============================================================================================================

function theme_color() {
    return '#ffffff';
}
add_filter('snow_monkey_theme_color', 'theme_color');


// ==============================================================================================================
//
// 独自テンプレート化
//
// ==============================================================================================================

function template( $hierarchy, $slug, $name, $vars) {
    // プラグインのテンプレートを最優先に
    $plugin_template = untrailingslashit(__DIR__) . '/template';
    array_unshift($hierarchy, $plugin_template);
    return $hierarchy;
}
add_filter('snow_monkey_template_part_root_hierarchy', 'template', 999, 4);

// フロントページのテンプレートを強制的に読み込む
function force_front_page_template($template) {
    if (is_front_page()) {
        $front_page_template = untrailingslashit(__DIR__) . '/template/front-page.php';
        if (file_exists($front_page_template)) {
            return $front_page_template;
        }
    }
    return $template;
}
add_filter('template_include', 'force_front_page_template', 999);


// ==============================================================================================================
//
// 機能無効化 & 削除
//
// ==============================================================================================================

// ブラウザ機能で電話番号をリンク化するのを無効化
function add_telephone_no_meta_tag() {
    echo '<meta name="format-detection" content="telephone=no">' . PHP_EOL;
}
add_action('wp_head', 'add_telephone_no_meta_tag', 99);

// ドロワー内の検索HTML削除
add_filter(
    'snow_monkey_template_part_render_template-parts/common/overlay-search-box',
    '__return_false'
);

// contact form7 pタグの自動挿入無効化
function wpcf7_autop_return_false() {
    return false;
}
add_filter('wpcf7_autop_or_not', 'wpcf7_autop_return_false');

// 投稿ページカスタマイズ   タイトル下に出るメタ情報のauthorを削除
add_action('snow_monkey_entry_meta_items', function () {
    remove_action('snow_monkey_entry_meta_items', 'snow_monkey_entry_meta_items_author', 30);
}, 9);

// プロフィールボックスを非表示にする
add_filter( 'snow_monkey_display_entry_author', '__return_false' );

// コメントセクションを非表示にする
add_filter( 'snow_monkey_display_comments', '__return_false' );


// ==============================================================================================================
//
// カスタマイズ
//
// ==============================================================================================================

// ドロワーメニュー削除
add_filter('has_nav_menu', function ($has_nav_menu, $location) {
    if ($location === 'drawer-nav' || $location === 'drawer-sub-nav') {
        return false;
    }
    return $has_nav_menu;
}, 10, 2);

// bodyにclass付与
add_filter('body_class', function ($classes) {
    // ロード中にclass付与
    $classes[] = 'loading';
    return $classes;
});

// reCAPTCHAをcf7のショートコードを使っているページだけで表示
add_action('wp_enqueue_scripts', function () {
    $post = get_post();
    if ($post && !has_shortcode($post->post_content, 'contact-form-7')) {
        wp_deregister_script('google-recaptcha');
    }
}, 100);

// ==============================================================================================================
//
// モジュールのインクルード
//
// ==============================================================================================================

// カスタマイズのうち、モジュール化したもの

// モジュールの存在確認（エラーハンドリング）
function safe_require_once($file_path) {
    if (file_exists($file_path)) {
        require_once $file_path;
    } else {
        error_log('File not found: ' . $file_path);
    }
}

// 読み込むモジュールを記載
safe_require_once(MY_SNOW_MONKEY_PATH . '/template/modules/loader.php');
safe_require_once(MY_SNOW_MONKEY_PATH . '/template/modules/modified.php');
safe_require_once(MY_SNOW_MONKEY_PATH . '/template/modules/shortcode.php');
safe_require_once(MY_SNOW_MONKEY_PATH . '/template/modules/eyecatch.php');
safe_require_once(MY_SNOW_MONKEY_PATH . '/template/modules/header-change.php');