# Anleitung

## Links

[ECS](https://docs.aws.amazon.com/cli/latest/reference/ecs/).
[authorize-security-group-ingress](https://docs.aws.amazon.com/cli/latest/reference/ec2/authorize-security-group-ingress.html).

## Allgemein

### Create Security Group && add rule

aws ec2 describe-security-groups

```
aws ec2 describe-vpcs | grep "VpcId"
```

VpcId in createVPC.json ersetzen mit ID eg. vpc-0f23fa97a97aeb1b7

```
aws ec2 create-security-group --cli-input-json file://aws/createVPC.json
aws ec2 describe-security-groups --filters Name=group-name,Values=ecs-ebliq-datasimulation | grep "GroupId"
aws ec2 describe-subnets --filters Name=vpc-id,Values=vpc-0f23fa97a97aeb1b7 | grep -e AvailabilityZone -e SubnetId
```

GroupId in addRulesToVPC.json ersetzen mit ersteller security-group-ID eg. sg-0db784abf8e7d7f99

```
aws ec2 authorize-security-group-ingress --cli-input-json file://aws/addRulesToVPC.json
```

### Create cluster

clustername eg. ebliq

```
aws ecs create-cluster --cluster-name <CLUSTER_NAME>
```

### Create Repository

Repositoryname eg. ebliq-datasimulation

```
aws ecr create-repository --repository-name <repo-name>
```

ID eg. 403039540759

```
(aws ecr get-login --no-include-email --region eu-central-1)
docker build -t ebliq-datasimulation .
docker tag ebliq-datasimulation:latest <ID>.dkr.ecr.eu-central-1.amazonaws.com/ebliq-datasimulation:latest
docker push <ID>.dkr.ecr.eu-central-1.amazonaws.com/ebliq-datasimulation:latest
```

### Registriert Task

```
aws ecs register-task-definition --cli-input-json file://taskdef.json
```

## Task ausführen

### Führt Task aus

securityGroups in run-task.json ersetzen mit ersteller security-group-ID eg. sg-0db784abf8e7d7f99

```
aws ecs run-task --cli-input-json file://aws/run-task.json
```

### List all Task

clustername eg. ebliq

```
aws ecs list-tasks --cluster=<CLUSTER_NAME>
```

### Stop den Task

```
aws ecs stop-task --cli-input-json file://aws/stop-task.json
aws ecs stop-task --cluster ebliq --reason diverse --task <TASK_ID>
```
