variable "ecs_cluster_name" {
  default = "restapi"
}

variable "ecs_task_family" {
  default = "my-task"
}

variable "container_name" {
  default = "my-container"
}

variable "container_port" {
  default = 3000
}

variable "cpu" {
  default = 256
}

variable "memory" {
  default = 512
}

variable "image_repo_name" {
  default = "satararestapi"
}

variable "aws_region" {
  default = "ap-south-1"
}
