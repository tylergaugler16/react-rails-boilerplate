# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_04_28_002103) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "audio_data", force: :cascade do |t|
    t.string "speaker"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "theme"
    t.string "series"
    t.string "s3_object_url"
    t.string "file_name"
  end

  create_table "auth_providers", force: :cascade do |t|
    t.string "name"
    t.string "uid"
    t.string "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "access_token"
    t.datetime "access_token_expires_at"
    t.string "password_digest"
    t.string "email"
  end

  create_table "widget_data", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "widget_datable_type"
    t.bigint "widget_datable_id"
    t.bigint "widget_id"
    t.index ["widget_datable_type", "widget_datable_id"], name: "index_widget_data_on_widget_datable_type_and_widget_datable_id"
    t.index ["widget_id"], name: "index_widget_data_on_widget_id"
  end

  create_table "widgets", force: :cascade do |t|
    t.string "primary_color"
    t.string "secondary_color"
    t.string "tertiary_color"
    t.string "header_text"
    t.string "subheader_text"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "data_type"
    t.bigint "workspace_id"
    t.index ["workspace_id"], name: "index_widgets_on_workspace_id"
  end

  create_table "workspace_memberships", force: :cascade do |t|
    t.boolean "can_edit"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.bigint "workspace_id"
    t.index ["user_id"], name: "index_workspace_memberships_on_user_id"
    t.index ["workspace_id"], name: "index_workspace_memberships_on_workspace_id"
  end

  create_table "workspaces", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "widget_data", "widgets"
  add_foreign_key "widgets", "workspaces"
  add_foreign_key "workspace_memberships", "users"
  add_foreign_key "workspace_memberships", "workspaces"
end
