resource "aws_instance" "public_server" {

  ami = "ami-0f5ee92e2d63afc18"
  instance_type = "t2.micro"

  subnet_id = aws_subnet.public_subnet.id

  vpc_security_group_ids = [aws_security_group.public_sg.id]

  key_name = "devops-key"

  tags = {
    Name = "public-server"
  }

}

resource "aws_instance" "private_server" {

  ami = "ami-0f5ee92e2d63afc18"
  instance_type = "t2.micro"

  subnet_id = aws_subnet.private_subnet.id

  vpc_security_group_ids = [aws_security_group.private_sg.id]

  key_name = "devops-key"

  tags = {
    Name = "private-server"
  }

}


resource "aws_instance" "private_server" {

  ami           = "ami-0f5ee92e2d63afc18"
  instance_type = "t2.medium"

  subnet_id = aws_subnet.private_subnet.id

  vpc_security_group_ids = [
    aws_security_group.private_sg.id
  ]

  key_name = "devops-key"

  user_data = file("install_tools.sh")

  tags = {
    Name = "devops-private-server"
  }

}