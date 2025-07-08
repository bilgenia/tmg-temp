<?php
/**
 * ショートコード関連のモジュール
 */

// オプション >　基本設定のフィールドを取得
function get_field_value($field) {
    // settingsを取得
    $post = get_page_by_path('settings', OBJECT, 'tmg_options');
    if ($post && !empty($field)) {
        $field_value = get_field($field, $post->ID);
        return $field_value;
    } else {
        return 'invalid field or post not found';
    }
}

// 取得したフィールド情報を出力するショートコード
function custom_field_shortcode($atts) {
    $atts = shortcode_atts(array(
        'name' => '',
    ), $atts);
    if (empty($atts['name'])) {
        return 'フィールド名が指定されていません。';
    }
    $field = 'tmg_options_fields_' . $atts['name'];
    return get_field_value($field);
}

// モジュールを読み込むショートコード
function load_module_shortcode($atts) {
    // ショートコードの属性を取得
    $atts = shortcode_atts(array(
        'file' => '', // 必須パラメータ：読み込むファイル名
    ), $atts);

    // ファイル名が指定されていない場合はエラーメッセージを返す
    if (empty($atts['file'])) {
        return 'エラー: ファイル名が指定されていません。';
    }

    // ファイルパスを構築
    $file_path = MY_SNOW_MONKEY_PATH . '/template/modules/' . $atts['file'] . '.php';

    // ファイルが存在しない場合はエラーメッセージを返す
    if (!file_exists($file_path)) {
        return 'エラー: 指定されたファイルが見つかりません。';
    }

    // 出力バッファリングを開始
    ob_start();
    
    // ファイルを読み込む
    include $file_path;
    
    // バッファの内容を取得してクリア
    $content = ob_get_clean();

    return $content;
}

// ショートコードを登録
function register_shortcodes() {
    add_shortcode('customfield', 'custom_field_shortcode');
    add_shortcode('load_module', 'load_module_shortcode');
}
add_action('init', 'register_shortcodes');