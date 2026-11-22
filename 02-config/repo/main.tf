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
