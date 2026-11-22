terraform {
  required_providers {
    github = {
      source  = "integrations/github"
      version = "~> 6.0"
    }
  }
}

provider "github" {
  owner = var.github_owner
}

resource "github_issue_labels" "this" {
  repository = var.github_repository

  label {
    name        = "✨feature"
    color       = "0e8a16"
    description = "新機能"
  }

  label {
    name        = "🦟bug"
    color       = "d93f0b"
    description = "バグ"
  }

  label {
    name        = "🧰chore"
    color       = "1d76db"
    description = "設定変更・依存更新など"
  }
}

resource "github_branch_default" "this" {
  repository = github_repository.this.name
  branch     = "develop"
}

resource "github_repository" "this" {
  name = var.github_repository

  has_wiki               = false
  has_issues             = true
  has_discussions        = true
  has_projects           = true

  allow_merge_commit = false
  allow_squash_merge = true
  allow_rebase_merge = false
  squash_merge_commit_title = "PR_TITLE"
  squash_merge_commit_message = "BLANK"

  allow_auto_merge = true
  allow_update_branch = true
  delete_branch_on_merge = true

  lifecycle {
    prevent_destroy = true
  }
}

# 依存パッケージの脆弱性アラート
resource "github_repository_vulnerability_alerts" "this" {
  repository = github_repository.this.name
  enabled    = true
}

# 以下は別対応
# - Projectsの作成
