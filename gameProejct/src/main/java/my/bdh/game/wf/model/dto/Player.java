package my.bdh.game.wf.model.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Player {
	private int fasterNo;
	private String fasterName;
	private String fasterRecord;
	private String difficulty; 
}
