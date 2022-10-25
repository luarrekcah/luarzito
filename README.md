# luarzito
Repositório com a lógica atual do Luarzito

# Como contribuir

<img align="right" width="300" src="https://firstcontributions.github.io/assets/Readme/fork.png" alt="fork deste repositório" />

## Faça um Fork deste repositório

Faça um Fork clicando no botão "Fork" no topo desta página. Isto irá criar uma cópia deste repositório na sua conta.

## Clone o repositório

<img align="right" width="300" src="https://firstcontributions.github.io/assets/Readme/clone.png" alt="clonar este repositório" />

Agora clone este repositório para a sua máquina. Clique no botão "Clone or download" e, em seguida, clique no ícone "Copy to clipboard" para copiar a URL.

Abra seu terminal e execute o seguinte comando do git:

```
git clone https://github.com/luarrekcah/Luarzito.git
```

<img align="right" width="300" src="https://firstcontributions.github.io/assets/Readme/copy-to-clipboard.png" alt="copiar URL" />

## Crie um Branch

Vá para o diretório do repositório no seu computador (caso você não esteja lá):

```
cd Luarzito
```

Agora crie um Branch usando o comando `git checkout`:

```
git checkout -b <add-seu-nome>
```

Por exemplo:

```
git checkout -b somefixes
```

## Efetue as alterações necessárias e faça um Commit

<img align="right" width="450" src="https://firstcontributions.github.io/assets/Readme/git-status.png" alt="git status" />

Se você for para o diretório do projeto e executar o comando `git status`, verá que há alterações. Adicione essas alterações ao Branch que você acabou de criar utilizando o comando `git add`:

```
git add .
```

Agora faça um Commit dessas alterações utilizando o comando `git commit`:

```
git commit -m "[FIXES] Some fixes"
```

## Faça um Push das alterações para o GitHub

Faça um Push utilizando o comando `git push`:

```
git push origin <nome-da-branch>
```

## Envie suas alterações para serem revisadas

Se você for para o seu repositório no GitHub, verá um botão `Compare & pull request`. Clique nesse botão.

<img style="float: right;" src="https://firstcontributions.github.io/assets/Readme/compare-and-pull.png" alt="Crie um Pull Request" />

Agora envie um Pull Request.

<img style="float: right;" src="https://firstcontributions.github.io/assets/Readme/submit-pull-request.png" alt="Envie o Pull Request" />

Logo estarei mesclando ('mergeando') as suas mudanças no Branch principal (master) deste projeto. Você receberá um e-mail de notificação quando as alterações forem mescladas.