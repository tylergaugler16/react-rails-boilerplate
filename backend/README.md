# README

## DB practices
* Table Names are plural
* Column names are singular
* Always use snake case : `workspace_memberships`
* Keys suffix with `_id`. Example: `workspace_id`
* Date columns: suffix with `_date`.
* Datetime columns suffix with: `_datetime`.
* Index columns prefixed with `idx_`.
* Don't use acronyms. Example: `amount, category` 👍 , `amt, catg` 👎.
* Use Audit Columns
 * `insert_dt` - type `DATETIME` - time when the user row was inserted. (use `NOW()`).
 * `insert_user_id` - type `INT` - a user(if logged in) who inserted the row(-1 as default used for when someone is not logged in/manually updated in the console, etc).
 * `insert_process_code` - type `VARCHAR` - a process, function, or class which inserted the row. Example: `"AuthProvider#find_or_create_from_auth_hash"`
 * `update_dt` - type `DATETIME` - time when the row was updated.
 * `update_user_id` - type `INT` - a user(if logged in), who modified the row. (-1 as default)
 * `update_process_code` - type `VARCHAR` - a process, function, or class which modified the row. Example: `"widgets_controller#update"`
 * `deleted_flag` - type `TINYINT` - use values `0` or `1` to denote if row has been marked as "deleted". Don't actually delete, just mark as delete. (Should look into this).
