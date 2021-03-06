import {Component, OnInit} from '@angular/core';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import {CamundaModdleDescriptorModule} from '../model/camunda-moddle-descriptor.module';
import customTranslate from '../customTranslate/customTranslate';
import propertiesPanelModule from 'bpmn-js-properties-panel';
import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda';


const defaultXML = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                   xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL"
                   xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
                   xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
                   xmlns:di="http://www.omg.org/spec/DD/20100524/DI"
                   xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd" id="sample-diagram"
                   targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn2:process id="Process_1" isExecutable="false">
    <bpmn2:startEvent id="StartEvent_1"/>
  </bpmn2:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
        <dc:Bounds height="36.0" width="36.0" x="412.0" y="240.0"/>
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn2:definitions>`;

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html'
})
export class DiagramComponent implements OnInit {
  public modeler: any;
  private state: any;

  ngOnInit() {
    const customTranslateModule = {
      translate: ['value', customTranslate]
    };
    this.modeler = new BpmnModeler({
      container: '#el',
      propertiesPanel: {
        parent: '#js-properties-panel'
      },
      additionalModules: [
        propertiesProviderModule,
        propertiesPanelModule,
        customTranslateModule
      ],
      moddleExtensions: {
        camunda: CamundaModdleDescriptorModule
      }
    });
    this.modeler.importXML(defaultXML);
  }

  /**
   * ??????xml/svg
   *  @param  type  ??????  svg / xml
   *  @param  data  ??????
   *  @param  name  ????????????
   */
  download = (type, data, name) => {
    let dataTrack = '';
    const a = document.createElement('a');

    switch (type) {
      case 'xml':
        dataTrack = 'bpmn';
        break;
      case 'svg':
        dataTrack = 'svg';
        break;
      default:
        break;
    }

    name = name || `diagram.${dataTrack}`;

    a.setAttribute('href', `data:application/bpmn20-xml;charset=UTF-8,${encodeURIComponent(data)}`);
    a.setAttribute('target', '_blank');
    a.setAttribute('dataTrack', `diagram:download-${dataTrack}`);
    a.setAttribute('download', name);

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  // ??????
  handleRedo = () => {
    this.modeler.get('commandStack').redo();
  }

  // ??????
  handleUndo = () => {
    this.modeler.get('commandStack').undo();
  }

  // ??????SVG??????
  handleDownloadSvg = () => {
    this.modeler.saveSVG({format: true}, (err, data) => {
      this.download('svg', data, 'svg');
    });
  }

  // ??????XML??????
  handleDownloadXml = () => {
    this.modeler.saveXML({format: true}, (err, data) => {
      this.download('xml', data, 'xml');
    });
  }

  // ?????????????????????
  handleZoom = (radio) => {
    const newScale = !radio
      ? 1.0 // ?????????radio?????????
      : this.state.scale + radio <= 0.2 // ??????????????????
        ? 0.2
        : this.state.scale + radio;

    this.modeler.get('canvas').zoom(newScale);
    this.state.scale = newScale;
  }

  // ??????
  handleSave() {
    this.modeler.saveXML({format: true}, async (err, xml) => {
      console.log(xml);
    });
  }
}
