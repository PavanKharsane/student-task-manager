resource "aws_lb" "devops_alb" {

  name = "devops-alb"

  internal = false

  load_balancer_type = "application"

  security_groups = [aws_security_group.public_sg.id]

  subnets = [
    aws_subnet.public_subnet.id
  ]

}