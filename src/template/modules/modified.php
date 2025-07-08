<?php
    add_action( 'snow_monkey_entry_meta_items', function() {
        // 更新日時を表示するアクションを削除
        remove_action( 'snow_monkey_entry_meta_items', 'snow_monkey_entry_meta_items_modified', 20 );
    }, 9 );