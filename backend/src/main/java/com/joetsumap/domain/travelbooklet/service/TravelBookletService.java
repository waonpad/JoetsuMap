package com.joetsumap.domain.travelbooklet.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.joetsumap.common.file.service.Base64FileService;
import com.joetsumap.domain.travelbooklet.constant.TravelBookletConst;
import com.joetsumap.domain.travelbooklet.entity.TravelBooklet;
import com.joetsumap.domain.travelbooklet.payload.request.CreateTravelBookletRequest;
import com.joetsumap.domain.travelbooklet.payload.request.UpdateTravelBookletRequest;
import com.joetsumap.domain.travelbooklet.payload.response.TravelBookletDTO;
import com.joetsumap.domain.travelbooklet.payload.response.TravelBookletListResponse;
import com.joetsumap.domain.travelbooklet.payload.response.TravelBookletResponse;
import com.joetsumap.domain.travelbooklet.repository.TravelBookletRepository;
import com.joetsumap.domain.user.payload.response.UserDTO;
import com.joetsumap.security.services.UserDetailsImpl;
import com.joetsumap.error.util.ErrorUtil;

import jakarta.transaction.Transactional;

@Service
@Transactional(rollbackOn = Exception.class)
public class TravelBookletService {

  @Autowired
  TravelBookletRepository travelBookletRepository;

  @Autowired
  Base64FileService base64FileService;

  /**
   * 旅のしおりを全件取得する
   */
  public TravelBookletListResponse findAll() {

    List<TravelBooklet> travelBooklets = travelBookletRepository.findAll();

    List<TravelBookletDTO> travelBookletDTOList = travelBooklets.stream().map(travelBooklet -> {
      TravelBookletDTO travelbookletDTO = new TravelBookletDTO(travelBooklet);
      travelbookletDTO.setAuthor(new UserDTO(travelBooklet.getAuthor()));

      return travelbookletDTO;
  }).toList();

    return new TravelBookletListResponse(travelBookletDTOList);
  }

  /**
   * 旅のしおりをIDで取得する
   */
  public TravelBookletResponse findById(Long id) {

    TravelBooklet travelBooklet = travelBookletRepository.findById(id).get();

    TravelBookletDTO travelBookletDTO = new TravelBookletDTO(travelBooklet);
    travelBookletDTO.setAuthor(new UserDTO(travelBooklet.getAuthor()));

    return new TravelBookletResponse(travelBookletDTO);
  }

  /**
   * 旅のしおりを作成する
   */
  public TravelBookletResponse create(UserDetailsImpl userDetails, CreateTravelBookletRequest createRequest) {

    String photoFileName = base64FileService.uploadImageFromBase64(createRequest.getPhoto(), TravelBookletConst.PHOTO_SAVE_DIR);

    TravelBooklet travelBooklet = new TravelBooklet();

    travelBooklet.setTitle(createRequest.getTitle());
    travelBooklet.setText(createRequest.getText());
    travelBooklet.setPhoto(photoFileName);

    travelBookletRepository.saveAndFlush(travelBooklet);
    
    TravelBookletDTO travelBookletDTO = new TravelBookletDTO(travelBooklet);
    travelBookletDTO.setAuthor(new UserDTO(travelBooklet.getAuthor()));

    return new TravelBookletResponse(travelBookletDTO);
  }

  /**
   * 旅のしおりを更新する
   */
  public TravelBookletResponse update(UserDetailsImpl userDetails, UpdateTravelBookletRequest updateRequest, Long id) {

    TravelBooklet travelBooklet = travelBookletRepository.findById(id).get();

    ErrorUtil.checkAuthorWithException(userDetails, travelBooklet.getAuthor().getId());

    travelBooklet.setTitle(updateRequest.getTitle());
    travelBooklet.setText(updateRequest.getText());

    // 画像が更新されている場合のみbase64エンコードされた文字列を受け取り、画像を更新する
    if (updateRequest.getPhoto() != null) {
      String photoFileName = base64FileService.uploadImageFromBase64(updateRequest.getPhoto(), TravelBookletConst.PHOTO_SAVE_DIR);
      travelBooklet.setPhoto(photoFileName);
    }

    travelBookletRepository.saveAndFlush(travelBooklet);

    TravelBookletDTO travelBookletDTO = new TravelBookletDTO(travelBooklet);
    travelBookletDTO.setAuthor(new UserDTO(travelBooklet.getAuthor()));

    return new TravelBookletResponse(travelBookletDTO);
  }

  /**
   * 旅のしおりを削除する
   */
  public void delete(UserDetailsImpl userDetails, Long id) {

    TravelBooklet travelBooklet = travelBookletRepository.findById(id).get();

    ErrorUtil.checkAuthorWithException(userDetails, travelBooklet.getAuthor().getId());

    travelBookletRepository.delete(travelBooklet);
  }
}
