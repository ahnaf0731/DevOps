terraform {
  required_version = ">= 1.0"
  
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0"
    }
  }
}

provider "docker" {
  host = "unix:///var/run/docker.sock"
}

resource "docker_network" "fixitnow_network" {
  name = "fixitnow-network"
}

resource "docker_container" "mysql" {
  name  = "fixitnow-db"
  image = "mysql:8.0"
  
  env = [
    "MYSQL_ROOT_PASSWORD=Ahnaf111#",
    "MYSQL_DATABASE=fixitnowdb"
  ]
  
  ports {
    internal = 3306
    external = 3307
  }
  
  networks_advanced {
    name = docker_network.fixitnow_network.name
  }

  volumes {
    volume_name    = "mysql-data"
    container_path = "/var/lib/mysql"
  }
}

resource "docker_container" "backend" {
  name  = "fixitnow_backend_1"
  image = "ahnaf4920/backend-v1.0:latest"
  
  ports {
    internal = 8091
    external = 8090
  }
  
  networks_advanced {
    name = docker_network.fixitnow_network.name
  }

  depends_on = [docker_container.mysql]
}

resource "docker_container" "frontend" {
  name  = "fixitnow_frontend_1"
  image = "ahnaf4920/frontend-v1.0:latest"
  
  ports {
    internal = 80
    external = 3000
  }
  
  networks_advanced {
    name = docker_network.fixitnow_network.name
  }

  depends_on = [docker_container.backend]
}

resource "docker_volume" "mysql_data" {
  name = "mysql-data"
}

output "backend_url" {
  value = "http://localhost:8090"
}

output "frontend_url" {
  value = "http://localhost:3000"
}

output "database_url" {
  value = "localhost:3307"
}
