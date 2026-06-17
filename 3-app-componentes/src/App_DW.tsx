function Fundo(props: any) {
  return (
    <div
      class="grow relative flex flex-col"
      style="background: linear-gradient(#707080,#202030)"
    >
      {props.children}

      {/* Alteração 1: coloque o modelo_preview.svg na imagem abaixo */}
      <img
        class="absolute left-2 bottom-2"
        src="/modelo_preview.svg"
      ></img>

    </div>
  );
}

// Alteração 2: coloque seu nome nos integrantes
function Embaixo() {
  return (
    <Footer>
      <FooterCol title="3D Model Printer">
        Uma Ferramenta Interativa
      </FooterCol>
      <FooterCol title="Integrantes">
        <p>Yago Macambira</p>
      </FooterCol>
    </Footer>
  );
}

function BarraLateral() {
  return (
    <Sidebar variant="ghost">
      <Panel title="Modelo" indent_children>
        <Button align_left>
          <IconPortAbrir></IconPortAbrir> Abrir
        </Button>
        <Button align_left>
          <IconPortResponder></IconPortResponder> Comentar
        </Button>
        <Space></Space>

        {/* Alteração 3: coloque o ícone de imprimir */}
        <Button align_left color="primary">
          <IconPortImprimir></IconPortImprimir> Imprimir
        </Button>
      </Panel>

      <Panel title="Exibir" indent_children>
        <Checkbox checked>Anti-aliasing</Checkbox>
        <Checkbox checked>Ambiente</Checkbox>
        <Space></Space>

        {/* Alteração 4: coloque checkbox de Pontos, Linhas, Cores */}
        <Checkbox checked>Pontos</Checkbox>
        <Checkbox checked>Linhas</Checkbox>
        <Checkbox checked>Cores</Checkbox>
      </Panel>
    </Sidebar>
  );
}

function PontoDeVista() {
  return (
    <div class="text-white font-bold absolute right-2 top-2">
      <div class="flex justify-between gap-2 items-center">
        <Button size="s2_sm" color="neutral">
          <IconChevronLeft></IconChevronLeft>
        </Button>
        Ponto de Vista

        {/* Alteração 5: coloque a cor do botão igual ao primeiro */}
        <Button size="s2_sm" color="neutral">
          <IconChevronRight></IconChevronRight>
        </Button>
      </div>
    </div>
  );
}

function ImpressaoFeedback() {
  return (
    <div class="absolute right-2 bottom-5 text-white">
      <ProgressBar
        label="Impressão Concluída:"
        color="success"
        value={45}
      ></ProgressBar>
      <Space></Space>
      <p>O que você achou da impressão?</p>

      {/* Alteração 6: coloque um Rating */}
      <Rating value={4} />
    </div>
  );
}

function BarraStatus() {
  return (
    <div class="flex justify-end gap-5 p-2">
      <span>
        <b>594</b> faces
      </span>

      {/* Alteração 7: coloque arestas e vértices */}
      <span>
        <b>892</b> arestas
      </span>
      <span>
        <b>300</b> vértices
      </span>
    </div>
  );
}

function App() {
  return (
    <FullPage>
      <FullPageMain>

        {/* Alteração 8: coloque o elemento BarraLateral aqui */}
        <BarraLateral></BarraLateral>

        <div class="grow flex flex-col">
          <Fundo>
            <PontoDeVista></PontoDeVista>
            <ImpressaoFeedback></ImpressaoFeedback>
          </Fundo>

          {/* Alteração 9: coloque o elemento BarraStatus aqui */}
          <BarraStatus></BarraStatus>
        </div>
      </FullPageMain>

      <Embaixo></Embaixo>
    </FullPage>
  );
}

export default App;
